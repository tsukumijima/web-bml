import { Buffer } from "buffer";
export declare function preparePLTE(clut: number[][]): Buffer<ArrayBuffer>;
export declare function prepareTRNS(clut: number[][]): Buffer<ArrayBuffer>;
export declare function aribPNGToPNG(png: Buffer<ArrayBuffer>, clut: number[][]): {
    data: Buffer<ArrayBuffer>;
    width?: number;
    height?: number;
};
//# sourceMappingURL=arib_png.d.ts.map