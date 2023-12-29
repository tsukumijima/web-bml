import { SVGProviderOption } from "aribb24.js";
import { VideoPlayer } from "./video_player";
export declare class CaptionPlayer extends VideoPlayer {
    svg: SVGSVGElement;
    superSVG: SVGSVGElement;
    captionOption: SVGProviderOption;
    constructor(video: HTMLVideoElement, container: HTMLElement);
    setSource(_source: string): void;
    pes: Uint8Array | undefined;
    pts: number | undefined;
    endTime: number | undefined;
    superEndPCR: number | undefined;
    peses: {
        pes: Uint8Array;
        pts: number;
        endTime: number;
    }[];
    pcr: number | undefined;
    updateTime(pcr: number): void;
    push(streamId: number, pes: Uint8Array, pts?: number): void;
    private render;
    showCC(): void;
    hideCC(): void;
    private audioNode?;
    setPRAAudioNode(audioNode?: AudioNode): void;
}
//# sourceMappingURL=caption_player.d.ts.map