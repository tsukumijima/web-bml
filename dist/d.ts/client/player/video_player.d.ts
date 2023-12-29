export declare abstract class VideoPlayer {
    protected video: HTMLVideoElement;
    protected container: HTMLElement;
    constructor(video: HTMLVideoElement, container: HTMLElement);
    abstract setSource(source: string): void;
    play(): void;
    pause(): void;
    mute(): void;
    unmute(): void;
    showCC(): void;
    hideCC(): void;
    scale(_factor: number): void;
    setPRAAudioNode(_audioNode?: AudioNode): void;
}
//# sourceMappingURL=video_player.d.ts.map