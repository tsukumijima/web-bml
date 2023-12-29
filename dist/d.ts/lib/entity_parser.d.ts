/// <reference types="node" />
import { Buffer } from "buffer";
export type FieldValue = {
    type: "lws" | "quoted" | "tspecials" | "token";
    value: string;
};
export declare function entityHeaderToString(header: EntityHeader): string;
export type EntityHeader = {
    name: string;
    originalName: string;
    value: FieldValue[];
};
export type Entity = {
    headers: EntityHeader[];
    body: Buffer;
    multipartBody: Entity[] | null;
};
export declare function parseMediaTypeFromString(mediaType: string): {
    mediaType: MediaType | null;
    error: boolean;
};
export declare class EntityParser {
    buffer: Buffer;
    _offset: number;
    set offset(v: number);
    get offset(): number;
    constructor(buffer: Buffer);
    readEntity(): Entity | null;
    readMultipartEntityBody(mediaType: MediaType): Entity[] | null;
    readEntityHeader(): EntityHeader | null;
    readFieldValue(): FieldValue[];
    readToken(): string | null;
    readImpliedLWS(): void;
    readLWS(): boolean;
    readText(): string;
    readQdText(): string;
    readQuotedString(): string | null;
    readMediaType(): MediaType | null;
    readMediaTypeParameter(): MediaTypeParameter | null;
}
export declare function parseMediaType(tokens: FieldValue[]): {
    mediaType: MediaType | null;
    error: boolean;
};
export type MediaType = {
    type: string;
    originalType: string;
    subtype: string;
    originalSubtype: string;
    parameters: MediaTypeParameter[];
};
export type MediaTypeParameter = {
    attribute: string;
    originalAttribute: string;
    value: string;
};
//# sourceMappingURL=entity_parser.d.ts.map