import { Buffer } from "buffer";
export type MNGAnimation = {
    keyframes: Keyframe[];
    options: KeyframeAnimationOptions;
    width: number;
    height: number;
    blobs: string[];
};
export declare function aribMNGToCSSAnimation(mng: Buffer<ArrayBuffer>, clut: number[][]): MNGAnimation | null;
//# sourceMappingURL=arib_mng.d.ts.map