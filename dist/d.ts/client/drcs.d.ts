/// <reference types="node" />
import { Buffer } from "buffer";
type DRCSGlyph = {
    width: number;
    height: number;
    depth: number;
    bitmap: number[];
};
type DRCSGlyphs = {
    ku: number;
    ten: number;
    glyphs: DRCSGlyph[];
};
export declare class BinaryWriter {
    private buffer;
    private offset;
    private size;
    constructor();
    get position(): number;
    seek(offset: number): number;
    private extend;
    writeUInt8(value: number): number;
    writeUInt16BE(value: number): number;
    writeUInt24BE(value: number): number;
    writeUInt32BE(value: number): number;
    writeInt8(value: number): number;
    writeInt16BE(value: number): number;
    writeInt32BE(value: number): number;
    writeInt64BE(value: number): number;
    writeASCII(value: string): number;
    writeBuffer(value: Buffer): number;
    getBuffer(): Buffer;
    subarray(start?: number | undefined, end?: number | undefined): Buffer;
}
export declare function toTTF(glyphs: DRCSGlyphs[]): {
    ttf: Buffer;
    unicodeCharacters: number[];
};
export declare function loadDRCS(drcs: Buffer, filterId?: number): DRCSGlyphs[];
export {};
//# sourceMappingURL=drcs.d.ts.map