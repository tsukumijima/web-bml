import { VideoPlayer } from "./video_player";
import * as aribb24js from "aribb24.js";
export declare class WebmVideoPlayer extends VideoPlayer {
    captionRenderer: aribb24js.SVGRenderer | null;
    superimposeRenderer: aribb24js.SVGRenderer | null;
    private PRACallback;
    setSource(source: string): void;
    push(streamId: number, data: Uint8Array, pts?: number): void;
    showCC(): void;
    hideCC(): void;
    private audioNode?;
    setPRAAudioNode(audioNode?: AudioNode): void;
}
//# sourceMappingURL=webm.d.ts.map