import { Indicator } from "./bml_browser";
import { Content } from "./content";
import { VideoPlayer } from "./player/video_player";
export declare class RemoteControl implements Indicator {
    content?: Content;
    player?: VideoPlayer;
    element: HTMLElement;
    receivingStatusElement: HTMLElement;
    networkingStatusElement?: HTMLElement;
    constructor(element: HTMLElement, receivingStatusElement: HTMLElement, networkingStatusElement?: HTMLElement, content?: Content, player?: VideoPlayer);
    private process;
    url: string;
    receiving: boolean;
    networkingPost: boolean;
    eventName: string | null;
    loading: boolean;
    private update;
    setUrl(name: string, loading: boolean): void;
    setReceivingStatus(receiving: boolean): void;
    setNetworkingPostStatus(post: boolean): void;
    setNetworkingGetStatus(get: boolean): void;
    setEventName(eventName: string | null): void;
}
//# sourceMappingURL=remote_controller_client.d.ts.map