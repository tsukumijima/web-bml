import * as aribb24js from "aribb24.js";
import { VideoPlayer } from "./video_player";
export declare class HLSVideoPlayer extends VideoPlayer {
    captionRenderer: aribb24js.SVGRenderer | null;
    private PRACallback;
    setSource(source: string): void;
    showCC(): void;
    hideCC(): void;
    private audioNode?;
    setPRAAudioNode(audioNode?: AudioNode): void;
}
//# sourceMappingURL=hls.d.ts.map