import { TsStream } from "@tsukumijima/aribts";
import * as wsApi from "./ws_api";
export type DecodeTSOptions = {
    sendCallback: (msg: wsApi.ResponseMessage) => void;
    serviceId?: number;
    parsePES?: boolean;
    dumpError?: boolean;
};
export declare function decodeTS(options: DecodeTSOptions): TsStream;
//# sourceMappingURL=decode_ts.d.ts.map