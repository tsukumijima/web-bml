import { BroadcasterDatabase } from "./broadcaster_database";
import { Resources } from "./resource";
import { type Logger } from "./util/logger";
export declare class NVRAM {
    private readonly resources;
    private readonly broadcasterDatabase;
    private readonly logger;
    private readonly prefix;
    constructor(resources: Resources, broadcasterDatabase: BroadcasterDatabase, logger: Logger, prefix?: string);
    private getBroadcasterInfo;
    private findNvramArea;
    private getLocalStorageKey;
    private readNVRAM;
    private writeNVRAM;
    readPersistentArray(filename: string, structure: string): any[] | null;
    writePersistentArray(filename: string, structure: string, data: any[], period?: Date, force?: boolean): number;
    private providerAreaPermission;
    cspSetAccessInfoToProviderArea(data: Uint8Array): boolean;
    readPersistentArrayWithAccessCheck(filename: string, structure: string): any[] | null;
    writePersistentArrayWithAccessCheck(filename: string, structure: string, data: any[], period?: Date): number;
    checkAccessInfoOfPersistentArray(uri: string): number;
}
//# sourceMappingURL=nvram.d.ts.map