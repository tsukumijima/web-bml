/// <reference types="node" />
import { Buffer } from "buffer";
export declare function preparePLTE(clut: number[][]): Buffer;
export declare function prepareTRNS(clut: number[][]): Buffer;
export declare function aribPNGToPNG(png: Buffer, clut: number[][]): {
    data: Buffer;
    width?: number;
    height?: number;
};
//# sourceMappingURL=arib_png.d.ts.map