import { Profile } from "./resource";
export type TextDecodeFunction = (input: Uint8Array) => string;
export type TextEncodeFunction = (input: string) => Uint8Array;
export declare function getTextDecoder(profile: Profile | undefined): TextDecodeFunction;
export declare function getTextEncoder(profile: Profile | undefined): TextEncodeFunction;
//# sourceMappingURL=text.d.ts.map