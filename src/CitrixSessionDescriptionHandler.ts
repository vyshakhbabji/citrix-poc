import {
    PeerConnectionOptions,
    WebSessionDescriptionHandler,
    WebSessionDescriptionHandlerOptions
} from 'sip.js/types/Web/session-description-handler';
import {EventEmitter} from 'events';
import {TypeStrings} from 'sip.js/lib/Enums';
import {Session, InviteClientContext, InviteServerContext, Utils, Exceptions, UA} from 'sip.js';
import {BodyObj} from 'sip.js/lib/Web/SessionDescriptionHandler';
import {
    SessionDescriptionHandler as SessionDescriptionHandlerDefinition,
    SessionDescriptionHandlerModifiers,
    SessionDescriptionHandlerOptions,
    SessionDescriptionHandlerObserver
} from 'sip.js/lib/Web/SessionDescriptionHandlerObserver';
import * as Modifiers from 'sip.js/lib/Web/Modifiers';

import {Logger} from 'sip.js/types/logger-factory';
//vyshakhbabji addition
import * as CitrixWebRTC from './CitrixWebRTC_fixed.js';

//TODO vyshakhbabji Check this
// import {Utils} from 'sip.js/types/utils';

export class CitrixSessionDescriptionHandler extends EventEmitter implements WebSessionDescriptionHandler {
    /**
     * @param {SIP.Session} session
     * @param {Object} [options]
     */
    public static defaultFactory(
        session: InviteClientContext | InviteServerContext,
        options: any
    ): CitrixSessionDescriptionHandler {
        const logger: Logger = session.ua.getLogger('sip.invitecontext.citrixSessionDescriptionHandler', session.id);
        const observer: SessionDescriptionHandlerObserver = new SessionDescriptionHandlerObserver(session, options);
        return new CitrixSessionDescriptionHandler(logger, observer, options);
    }

    public type: TypeStrings;
    public peerConnection!: CitrixWebRTC.PeerConnection;
    private options: any;
    private logger: Logger;
    private observer: SessionDescriptionHandlerObserver;
    private dtmfSender: any;
    private shouldAcquireMedia: boolean;
    private CONTENT_TYPE: string;
    private direction: string;
    private C: any;
    private modifiers: SessionDescriptionHandlerModifiers;
    private WebRTC: any;
    //TODO:Check this
    private iceGatheringDeferred: Utils.Deferred<any> | undefined;
    private iceGatheringTimeout: boolean;
    private iceGatheringTimer: any | undefined;
    private constraints: any;
    private vdiCitrix: any;

    private localAudio: any;
    private remoteAudio: any;
    private RTCOfferOptions: any;

    constructor(logger: Logger, observer: SessionDescriptionHandlerObserver, options: any) {
        super();
        this.type = TypeStrings.SessionDescriptionHandler;
        // TODO: Validate the options
        this.options = options || {};

        this.logger = logger;
        this.observer = observer;
        this.dtmfSender = undefined;

        this.shouldAcquireMedia = true;

        this.CONTENT_TYPE = 'application/sdp';

        this.C = {
            DIRECTION: {
                NULL: null,
                SENDRECV: 'sendrecv',
                SENDONLY: 'sendonly',
                RECVONLY: 'recvonly',
                INACTIVE: 'inactive'
            }
        };

        this.logger.log('CitrixSessionDescriptionHandlerOptions: ' + JSON.stringify(this.options));

        this.direction = this.C.DIRECTION.NULL;

        //TODO : vyshakhbabji Modifiers extraction neeeded?
        this.modifiers = this.options.modifiers || [];
        if (!Array.isArray(this.modifiers)) {
            this.modifiers = [this.modifiers];
        }

        const environment = (global as any).window || global;
        this.WebRTC = {
            MediaStream: environment.MediaStream,
            getUserMedia: environment.navigator.mediaDevices.getUserMedia.bind(environment.navigator.mediaDevices),
            RTCPeerConnection: environment.RTCPeerConnection
        };

        this.vdiCitrix = environment.CitrixWebRTC;

        this.iceGatheringTimeout = false;

        this.initPeerConnection(this.options.peerConnectionOptions);

        this.constraints = this.checkAndDefaultConstraints(this.options.constraints);

        this.localAudio = this.options.localAudio;
        this.remoteAudio = this.options.remoteAudio;
        this.RTCOfferOptions = this.options.RTCOfferOptions;
    }

    // Functions the sesssion can use

    /**
     * Destructor
     */
    public close(): void {
        this.logger.log('closing PeerConnection');
        // have to check signalingState since this.close() gets called multiple times
        if (this.peerConnection && this.peerConnection.signalingState !== 'closed') {
            if (this.peerConnection.getSenders) {
                this.peerConnection.getSenders().forEach((sender: any) => {
                    if (sender.track) {
                        sender.track.stop();
                    }
                });
            } else {
                this.logger.warn('Using getLocalStreams which is deprecated');
                (this.peerConnection as any).getLocalStreams().forEach((stream: any) => {
                    stream.getTracks().forEach((track: any) => {
                        track.stop();
                    });
                });
            }
            if (this.peerConnection.getReceivers) {
                this.peerConnection.getReceivers().forEach((receiver: any) => {
                    if (receiver.track) {
                        receiver.track.stop();
                    }
                });
            } else {
                this.logger.warn('Using getRemoteStreams which is deprecated');
                (this.peerConnection as any).getRemoteStreams().forEach((stream: any) => {
                    stream.getTracks().forEach((track: any) => {
                        track.stop();
                    });
                });
            }
            this.resetIceGatheringComplete();
            this.peerConnection.close();
        }
    }

    /**
     * Gets the local description from the underlying media implementation
     * @param {Object} [options] Options object to be used by getDescription
     * @param {MediaStreamConstraints} [options.constraints] MediaStreamConstraints
     *   https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamConstraints
     * @param {Object} [options.peerConnectionOptions] If this is set it will recreate the peer
     *   connection with the new options
     * @param {Array} [modifiers] Array with one time use description modifiers
     * @returns {Promise} Promise that resolves with the local description to be used for the session
     */
    public getDescription(
        options: WebSessionDescriptionHandlerOptions = {},
        modifiers: SessionDescriptionHandlerModifiers = []
    ): Promise<BodyObj> {
        if (options.peerConnectionOptions) {
            this.initPeerConnection(options.peerConnectionOptions);
        }

        // Merge passed constraints with saved constraints and save
        let newConstraints: any = Object.assign({}, this.constraints, options.constraints);
        newConstraints = this.checkAndDefaultConstraints(newConstraints);
        if (JSON.stringify(newConstraints) !== JSON.stringify(this.constraints)) {
            this.constraints = newConstraints;
            this.shouldAcquireMedia = true;
        }

        if (!Array.isArray(modifiers)) {
            modifiers = [modifiers];
        }

        //TODO: vyshakhbabji make modifications for citrix
        modifiers = modifiers.concat(this.modifiers);

        //TODO: vyshakhbabji setRTC OFferoptions as per citrix need (offertoVideo offertoaudio)
        //Need to add the modifiers here instead
        return Promise.resolve()
            .then(() => {
                if (this.shouldAcquireMedia) {
                    return this.acquire(this.constraints).then(() => {
                        this.shouldAcquireMedia = false;
                    });
                }
            })
            .then(() => this.createOfferOrAnswer(options.RTCOfferOptions, modifiers))
            .then((description: RTCSessionDescriptionInit) => {
                this.emit('getDescription', description);
                return {
                    body: description.sdp,
                    contentType: this.CONTENT_TYPE
                };
            });
    }

    /**
     * Check if the Session Description Handler can handle the Content-Type described by a SIP Message
     * @param {String} contentType The content type that is in the SIP Message
     * @returns {boolean}
     */
    public hasDescription(contentType: string): boolean {
        return contentType === this.CONTENT_TYPE;
    }

    /**
     * The modifier that should be used when the session would like to place the call on hold
     * @param {String} [sdp] The description that will be modified
     * @returns {Promise} Promise that resolves with modified SDP
     */
    public holdModifier(description: RTCSessionDescriptionInit): Promise<RTCSessionDescriptionInit> {
        if (!description.sdp) {
            return Promise.resolve(description);
        }

        if (!/a=(sendrecv|sendonly|recvonly|inactive)/.test(description.sdp)) {
            description.sdp = description.sdp.replace(/(m=[^\r]*\r\n)/g, '$1a=sendonly\r\n');
        } else {
            description.sdp = description.sdp.replace(/a=sendrecv\r\n/g, 'a=sendonly\r\n');
            description.sdp = description.sdp.replace(/a=recvonly\r\n/g, 'a=inactive\r\n');
        }
        return Promise.resolve(description);
    }

    /**
     * Set the remote description to the underlying media implementation
     * @param {String} sessionDescription The description provided by a SIP message to be set on the media implementation
     * @param {Object} [options] Options object to be used by getDescription
     * @param {MediaStreamConstraints} [options.constraints] MediaStreamConstraints
     *   https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamConstraints
     * @param {Object} [options.peerConnectionOptions] If this is set it will recreate the peer
     *   connection with the new options
     * @param {Array} [modifiers] Array with one time use description modifiers
     * @returns {Promise} Promise that resolves once the description is set
     */
    public setDescription(
        sessionDescription: string,
        options: WebSessionDescriptionHandlerOptions = {},
        modifiers: SessionDescriptionHandlerModifiers = []
    ): Promise<void> {
        if (options.peerConnectionOptions) {
            this.initPeerConnection(options.peerConnectionOptions);
        }

        if (!Array.isArray(modifiers)) {
            modifiers = [modifiers];
        }
        modifiers = modifiers.concat(this.modifiers);

        const description: RTCSessionDescriptionInit = {
            type: this.hasOffer('local') ? 'answer' : 'offer',
            sdp: sessionDescription
        };

        return (
            Promise.resolve()
                .then(() => {
                    // Media should be acquired in getDescription unless we need to do it sooner for some reason (FF61+)
                    if (this.shouldAcquireMedia && this.options.alwaysAcquireMediaFirst) {
                        return this.acquire(this.constraints).then(() => {
                            this.shouldAcquireMedia = false;
                        });
                    }
                })
                //TODO: fix modifiers everywhere possible
                .then(() => Utils.reducePromises(modifiers, description))
                .catch(e => {
                    if (e.type === TypeStrings.SessionDescriptionHandlerError) {
                        throw e;
                    }
                    const error = new Exceptions.SessionDescriptionHandlerError(
                        'setDescription',
                        e,
                        'The modifiers did not resolve successfully'
                    );
                    this.logger.error(error.message);
                    this.emit('peerConnection-setRemoteDescriptionFailed', error);
                    throw error;
                })
                .then(description => {
                    //TODO: vyshakhbabji add video = 0
                    var type = description.type;
                    var sdp = description.sdp;
                    // var video = "m=video 0 UDP/TLS/RTP/SAVPF 120\n" +
                    //     "c=IN IP4 0.0.0.0\n" +
                    //     "a=inactive\n";
                    // sdp = sdp + video;

                    var modifiedDescription = new RTCSessionDescription({type, sdp});

                    console.error('modified description', modifiedDescription);
                    return new Promise((resolve, reject) => {
                        this.emit('setDescription', modifiedDescription);
                        this.peerConnection.setRemoteDescription(
                            modifiedDescription,
                            () => {
                                this.logger.log('setRemoteDescription success');
                                resolve();
                            },
                            () => {
                                this.logger.log('setRemoteDescription failed');
                                reject();
                            }
                        );
                    });
                })
                .catch(e => {
                    if (e.type === TypeStrings.SessionDescriptionHandlerError) {
                        throw e;
                    }
                    // Check the original SDP for video, and ensure that we have want to do audio fallback
                    if (/^m=video.+$/gm.test(sessionDescription) && !options.disableAudioFallback) {
                        // Do not try to audio fallback again
                        options.disableAudioFallback = true;
                        // Remove video first, then do the other modifiers
                        return this.setDescription(
                            sessionDescription,
                            options,
                            [Modifiers.stripVideo].concat(modifiers)
                        );
                    }
                    const error = new Exceptions.SessionDescriptionHandlerError('setDescription', e);
                    if (error.error) {
                        this.logger.error(error.error);
                    }
                    this.emit('peerConnection-setRemoteDescriptionFailed', error);
                    throw error;
                })
                .then(() => {
                    this.emit('confirmed', this);
                    if (this.peerConnection.getReceivers) {
                        this.emit('setRemoteDescription', this.peerConnection.getReceivers());
                    } else {
                        this.emit('setRemoteDescription', (this.peerConnection as any).getRemoteStreams());
                    }
                })
        );
    }

    /**
     * Send DTMF via RTP (RFC 4733)
     * @param {String} tones A string containing DTMF digits
     * @param {Object} [options] Options object to be used by sendDtmf
     * @returns {boolean} true if DTMF send is successful, false otherwise
     */
    public sendDtmf(tones: string, options: any = {}): boolean {
        if (!this.dtmfSender && this.hasBrowserGetSenderSupport()) {
            const senders = this.peerConnection.getSenders();
            if (senders.length > 0) {
                this.dtmfSender = senders[0].dtmf;
            }
        }
        if (!this.dtmfSender && this.hasBrowserTrackSupport()) {
            const streams = (this.peerConnection as any).getLocalStreams();
            if (streams.length > 0) {
                const audioTracks = streams[0].getAudioTracks();
                if (audioTracks.length > 0) {
                    this.dtmfSender = (this.peerConnection as any).createDTMFSender(audioTracks[0]);
                }
            }
        }
        if (!this.dtmfSender) {
            return false;
        }
        try {
            this.dtmfSender.insertDTMF(tones, options.duration, options.interToneGap);
        } catch (e) {
            if (e.type === 'InvalidStateError' || e.type === 'InvalidCharacterError') {
                this.logger.error(e);
                return false;
            }
            throw e;
        }
        this.logger.log('DTMF sent via RTP: ' + tones.toString());
        return true;
    }

    /**
     * Get the direction of the session description
     * @returns {String} direction of the description
     */
    public getDirection(): string {
        return this.direction;
    }

    // Internal functions

    private createOfferOrAnswer(
        RTCOfferOptions: any = {},
        modifiers: SessionDescriptionHandlerModifiers = []
    ): Promise<RTCSessionDescriptionInit> {
        const methodName: string = this.hasOffer('remote') ? 'createAnswer' : 'createOffer';
        const pc = this.peerConnection;

        this.logger.log(methodName);

        var localDescr = {
            sdp: undefined,
            type: undefined
        };

        console.error('RTCOfferOptions', RTCOfferOptions);

        const createOfferOrAnswerPromise = () => {
            return new Promise((resolve, reject) => {
                pc[methodName](
                    descr => {
                        console.error('sdp is', descr);
                        resolve(descr);
                    },
                    error => {
                        console.error('error is', error);
                        if (error) return reject(error);
                    },
                    RTCOfferOptions
                );
            });
        };

        return createOfferOrAnswerPromise()
            .catch((e: any) => {
                if (e.type === TypeStrings.SessionDescriptionHandlerError) {
                    throw e;
                }
                const error = new Exceptions.SessionDescriptionHandlerError(
                    'createOfferOrAnswer',
                    e,
                    'peerConnection-' + methodName + 'Failed'
                );
                this.emit('peerConnection-' + methodName + 'Failed', error);
                throw error;
            })
            .then((sdp: RTCSessionDescriptionInit) =>
                Utils.reducePromises(modifiers, this.createRTCSessionDescriptionInit(sdp))
            )
            .then((sdp: any) => {
                this.resetIceGatheringComplete();
                this.logger.log('Setting local sdp.');
                this.logger.log('sdp is ' + sdp.sdp || 'undefined');
                pc.setLocalDescription(sdp);
                localDescr.sdp = sdp.sdp;
                localDescr.type = sdp.type;
                return Promise.resolve();
            })
            .catch((e: any) => {
                if (e.type === TypeStrings.SessionDescriptionHandlerError) {
                    throw e;
                }
                const error = new Exceptions.SessionDescriptionHandlerError(
                    'createOfferOrAnswer',
                    e,
                    'peerConnection-SetLocalDescriptionFailed'
                );
                this.emit('peerConnection-SetLocalDescriptionFailed', error);
                throw error;
            })
            .then(() => this.waitForIceGatheringComplete())
            .then(() => {
                //TODO:vyshakhbabji File bug for no access to localDescription via pc.localDescription
                const localDescription = this.createRTCSessionDescriptionInit(localDescr);
                return Utils.reducePromises(modifiers, localDescription);
            })
            .then((localDescription: RTCSessionDescriptionInit) => {
                console.error('Final return of localDescription', localDescription);
                this.setDirection(localDescription.sdp || '');
                return localDescription;
            })
            .catch((e: any) => {
                if (e.type === TypeStrings.SessionDescriptionHandlerError) {
                    throw e;
                }
                const error = new Exceptions.SessionDescriptionHandlerError('createOfferOrAnswer', e);
                this.logger.error(error.toString());
                throw error;
            });
    }

    // Creates an RTCSessionDescriptionInit from an RTCSessionDescription
    private createRTCSessionDescriptionInit(RTCSessionDescription: any): RTCSessionDescriptionInit {
        return {
            type: RTCSessionDescription.type,
            sdp: RTCSessionDescription.sdp
        };
    }

    private addDefaultIceCheckingTimeout(peerConnectionOptions: PeerConnectionOptions): PeerConnectionOptions {
        if (peerConnectionOptions.iceCheckingTimeout === undefined) {
            peerConnectionOptions.iceCheckingTimeout = 5000;
        }
        return peerConnectionOptions;
    }

    private addDefaultIceServers(rtcConfiguration: any): any {
        if (!rtcConfiguration.iceServers) {
            rtcConfiguration.iceServers = [{urls: 'stun:stun.l.google.com:19302'}];
        }
        return rtcConfiguration;
    }

    private checkAndDefaultConstraints(constraints: any): any {
        const defaultConstraints: any = {audio: true, video: !this.options.alwaysAcquireMediaFirst};
        constraints = constraints || defaultConstraints;
        // Empty object check
        if (Object.keys(constraints).length === 0 && constraints.constructor === Object) {
            return defaultConstraints;
        }
        return constraints;
    }

    private hasBrowserTrackSupport(): boolean {
        return Boolean(this.peerConnection.addTrack);
    }

    private hasBrowserGetSenderSupport(): boolean {
        return Boolean(this.peerConnection.getSenders);
    }

    private initPeerConnection(options: any = {}): void {
        options = this.addDefaultIceCheckingTimeout(options);
        options.rtcConfiguration = options.rtcConfiguration || {};
        options.rtcConfiguration = this.addDefaultIceServers(options.rtcConfiguration);

        this.logger.log('initPeerConnection');

        if (this.peerConnection) {
            this.logger.log('Already have a peer connection for this session. Tearing down.');
            this.resetIceGatheringComplete();
            this.peerConnection.close();
        }

        this.peerConnection = new this.vdiCitrix.CitrixPeerConnection(options.rtcConfiguration);

        // this.vdiCitrix.mapAudioElement(this.remoteAudio);
        // this.vdiCitrix.mapAudioElement(this.localAudio);

        this.logger.log('New peer connection created');

        //Citrix SDK doesnt support addTrack so no 'ontrack'
        if ('ontrack' in this.peerConnection) {
            this.logger.warn('Using onaddstream which is deprecated');
            (this.peerConnection as any).ontrack = (e: any) => {
                this.logger.log('stream added ' + e);
                // this.vdiCitrix.mapAudioElement(this.remoteAudio);
                // this.remoteAudio.srcObject = e.stream;
                this.emit('addStream', e);
                this.addTrack();
            };
        } else {
            this.logger.warn('Using onaddstream which is deprecated');
            (this.peerConnection as any).onaddstream = (e: any) => {
                this.logger.log('stream added ' + e);
                // this.vdiCitrix.mapAudioElement(this.remoteAudio);
                // this.remoteAudio.srcObject = e.stream;
                this.emit('addStream', e);
                this.addTrack();
            };
        }

        this.peerConnection.onicecandidate = (e: any) => {
            this.emit('iceCandidate', e);
            if (e.candidate) {
                this.logger.log(
                    'ICE candidate received: ' + (e.candidate.candidate === null ? null : e.candidate.candidate.trim())
                );
            } else if (e.candidate === null) {
                // indicates the end of candidate gathering
                this.logger.log('ICE candidate gathering complete');
                this.triggerIceGatheringComplete();
            }
        };

        this.peerConnection.onicegatheringstatechange = () => {
            this.logger.log('RTCIceGatheringState changed: ' + this.peerConnection.iceGatheringState);
            switch (this.peerConnection.iceGatheringState) {
                case 'gathering':
                    this.emit('iceGathering', this);
                    if (!this.iceGatheringTimer && options.iceCheckingTimeout) {
                        this.iceGatheringTimeout = false;
                        this.iceGatheringTimer = setTimeout(() => {
                            this.logger.log(
                                'RTCIceChecking Timeout Triggered after ' + options.iceCheckingTimeout + ' milliseconds'
                            );
                            this.iceGatheringTimeout = true;
                            this.triggerIceGatheringComplete();
                        }, options.iceCheckingTimeout);
                    }
                    break;
                case 'complete':
                    this.triggerIceGatheringComplete();
                    break;
            }
        };

        this.peerConnection.onsignalingstatechange = () => {
            this.logger.log('onsignalingstatechange: ' + this.peerConnection.signalingState);
        };

        this.peerConnection.onnegotiationneeded = function() {
            console.error('onnegotiationneeded');
            //what to do here? createOffer and  addStream again ?
        };

        this.peerConnection.oniceconnectionstatechange = () => {
            let stateEvent: string;

            switch (this.peerConnection.iceConnectionState) {
                case 'new':
                    stateEvent = 'iceConnection';
                    break;
                case 'checking':
                    stateEvent = 'iceConnectionChecking';
                    break;
                case 'connected':
                    stateEvent = 'iceConnectionConnected';
                    break;
                case 'completed':
                    stateEvent = 'iceConnectionCompleted';
                    break;
                case 'failed':
                    stateEvent = 'iceConnectionFailed';
                    break;
                case 'disconnected':
                    stateEvent = 'iceConnectionDisconnected';
                    break;
                case 'closed':
                    stateEvent = 'iceConnectionClosed';
                    break;
                default:
                    this.logger.warn('Unknown iceConnection state: ' + this.peerConnection.iceConnectionState);
                    return;
            }
            this.logger.log('ICE Connection State changed to ' + stateEvent);
            this.emit(stateEvent, this);
        };
    }

    private acquire(constraints: any): any {
        // Default audio & video to true
        constraints = this.checkAndDefaultConstraints(constraints);

        return new Promise((resolve, reject) => {
            /*
             * Make the call asynchronous, so that ICCs have a chance
             * to define callbacks to `userMediaRequest`
             */
            this.logger.log('acquiring local media with constraints set as' + this.constraints);
            this.emit('userMediaRequest', constraints);

            //Citrix support for only audio - with audio deviceID generated by Citrix.enumarateDevices
            if (constraints.audio) {
                const getUserMediaPromise = (...args) => {
                    return new Promise((res, rej) => {
                        this.vdiCitrix.getUserMedia(...args, (streams, e) => {
                            if (e) return reject(e);
                            this.emit('userMedia', streams);
                            this.observer.trackAdded();
                            resolve(streams);
                        });
                    });
                };

                getUserMediaPromise(constraints).catch(e => {
                    this.emit('userMediaFailed', e);
                    throw new Error('getUserMedia Failed with error' + e.message);
                });
            } else {
                // Local streams were explicitly excluded.
                resolve([]);
            }
        })
            .catch(e => {
                if (e.type === TypeStrings.SessionDescriptionHandlerError) {
                    throw e;
                }
                const error = new Exceptions.SessionDescriptionHandlerError('acquire', e, 'unable to acquire streams');
                this.logger.error(error.message);
                if (error.error) {
                    this.logger.error(error.error);
                }
                throw error;
            })
            .then(streams => {
                this.logger.log('acquired local media streams');
                try {
                    // Remove old tracks
                    if (this.peerConnection.removeTrack) {
                        this.peerConnection.getSenders().forEach((sender: any) => {
                            this.peerConnection.removeTrack(sender);
                        });
                    }
                    return streams;
                } catch (e) {
                    return Promise.reject(e);
                }
            })
            .catch(e => {
                if (e.type === TypeStrings.SessionDescriptionHandlerError) {
                    throw e;
                }
                const error = new Exceptions.SessionDescriptionHandlerError('acquire', e, 'error removing streams');
                this.logger.error(error.message);
                if (error.error) {
                    this.logger.error(error.error);
                }
                throw error;
            })
            .then((streams: any) => {
                try {
                    // streams = [].concat(streams);
                    // streams.forEach((stream: any) => {
                    //     if (this.peerConnection.addTrack) {
                    //         stream.getTracks().forEach((track: any) => {
                    //             this.peerConnection.addTrack(track, stream);
                    //             this.addTrack();
                    //         });
                    //     } else {
                    // Chrome 59 does not support addTrack
                    (this.peerConnection as any).addStream(streams);
                    // this.addTrack();
                    this.vdiCitrix.mapAudioElement(this.localAudio);
                    this.localAudio.srcObject = streams;
                    // }
                    // });
                } catch (e) {
                    return Promise.reject(e);
                }
                return Promise.resolve();
            })
            .catch(e => {
                if (e.type === TypeStrings.SessionDescriptionHandlerError) {
                    throw e;
                }
                const error = new Exceptions.SessionDescriptionHandlerError('acquire', e, 'error adding stream');
                this.logger.error(error.message);
                if (error.error) {
                    this.logger.error(error.error);
                }
                throw error;
            });
    }

    private hasOffer(where: string): boolean {
        const offerState: string = 'have-' + where + '-offer';
        this.logger.log(
            'has offer is called with offerState = ' +
            offerState +
            ' and signalling state as = ' +
            this.peerConnection.signalingState
        );
        return this.peerConnection.signalingState === offerState;
    }

    // ICE gathering state handling
    private isIceGatheringComplete(): boolean {
        return this.peerConnection.iceGatheringState === 'complete' || this.iceGatheringTimeout;
    }

    private resetIceGatheringComplete(): void {
        this.iceGatheringTimeout = false;

        this.logger.log('resetIceGatheringComplete');

        if (this.iceGatheringTimer) {
            clearTimeout(this.iceGatheringTimer);
            this.iceGatheringTimer = undefined;
        }
        if (this.iceGatheringDeferred) {
            this.iceGatheringDeferred.reject();
            this.iceGatheringDeferred = undefined;
        }
    }

    private setDirection(sdp: string): void {
        const match = sdp.match(/a=(sendrecv|sendonly|recvonly|inactive)/);
        if (match === null) {
            this.direction = this.C.DIRECTION.NULL;
            this.observer.directionChanged();
            return;
        }
        const direction = match[1];
        switch (direction) {
            case this.C.DIRECTION.SENDRECV:
            case this.C.DIRECTION.SENDONLY:
            case this.C.DIRECTION.RECVONLY:
            case this.C.DIRECTION.INACTIVE:
                this.direction = direction;
                break;
            default:
                this.direction = this.C.DIRECTION.NULL;
                break;
        }
        this.logger.log('direction of the call is set to ' + this.direction);
        this.observer.directionChanged();
    }

    private triggerIceGatheringComplete(): void {
        if (this.isIceGatheringComplete()) {
            this.emit('iceGatheringComplete', this);

            if (this.iceGatheringTimer) {
                clearTimeout(this.iceGatheringTimer);
                this.iceGatheringTimer = undefined;
            }
            if (this.iceGatheringDeferred) {
                this.iceGatheringDeferred.resolve();
                this.iceGatheringDeferred = undefined;
            }
        }
    }

    private waitForIceGatheringComplete(): Promise<any> {
        this.logger.log('waitForIceGatheringComplete');
        if (this.isIceGatheringComplete()) {
            this.logger.log('ICE is already complete. Return resolved.');
            return Promise.resolve();
        }
        //TODO:Check this
        // else if (!this.iceGatheringDeferred) {
        //     // this.iceGatheringDeferred = Utils.defer();
        // }
        this.logger.log('ICE is not complete. Returning promise');
        return this.iceGatheringDeferred ? this.iceGatheringDeferred.promise : Promise.resolve();
    }

    private addTrack(): void {
        console.error('ADD TRACK CALLED');
        const pc = this.peerConnection;

        console.error('peerconnection on addTrack ', pc);

        var remoteStream;
        if (pc.getReceivers) {
            remoteStream = pc.getReceivers()[0];
            console.error('Remote stream is  ', remoteStream);
            // pc.getReceivers().forEach(receiver => {
            //     const rtrack = receiver.track;
            //     console.error('Remote track added', rtrack);
            //     if (rtrack) {
            //         remoteStream.addTrack(rtrack);
            //     }
            // });
        } else {
            remoteStream = pc.getRemoteStreams()[0];
            console.error('Remote track added', remoteStream);
        }

        if (remoteStream) {
            this.vdiCitrix.mapAudioElement(this.remoteAudio);
            this.remoteAudio.srcObject = remoteStream;
        }
        // remoteAudio.play().catch(() => {
        //     this.logger.log('Remote play was rejected');
        // });

        var localStream;
        if (pc.getSenders) {
            localStream = pc.getSenders()[0];
            console.error('Local stream is  ', localStream);
            // pc.getSenders().forEach(sender => {
            //     const strack = sender.track;
            //     console.error('Local track added ', strack);
            //     if (strack && strack.kind === 'audio') {
            //         localStream.addTrack(strack);
            //     }
            // });
        } else {
            localStream = pc.getLocalStreams()[0];
            console.error('Local track added ' + localStream);
        }
        if (localStream) {
            this.vdiCitrix.mapAudioElement(this.localAudio);
            this.localAudio.srcObject = localStream;
        }
        // this.localAudio.play().catch(() => {
        //     this.logger.log('Local play was rejected');
        // });
    }
}
