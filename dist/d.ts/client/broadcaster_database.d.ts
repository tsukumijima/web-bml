import { ResponseMessage } from "../lib/ws_api";
import * as resource from "./resource";
export declare class BroadcasterDatabase {
    private resources;
    private prefix;
    constructor(resources: resource.Resources, prefix?: string);
    private broadcastersPrefix;
    private affiliationsPrefix;
    private broadcasters;
    private affiliations;
    private localStorageBroadcasters;
    private localStorageAffiliations;
    getBroadcasterId(originalNetworkId?: number | null, serviceId?: number | null): number | null;
    getAffiliationIdList(originalNetworkId?: number | null, broadcasterId?: number | null): number[] | null;
    private seedDatabase;
    private loadDatabase;
    openDatabase(): void;
    onMessage(msg: ResponseMessage): void;
}
//# sourceMappingURL=broadcaster_database.d.ts.map