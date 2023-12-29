import { MediaType } from "../lib/entity_parser";
import { ComponentPMT, ModuleListEntry, ProgramInfoMessage, ResponseMessage } from "../lib/ws_api";
import { Indicator, IP } from "./bml_browser";
export type CachedComponent = {
    componentId: number;
    modules: Map<number, CachedModule>;
    dataEventId: number;
};
export type CachedModule = {
    moduleId: number;
    files: ReadonlyMap<string | null, CachedFile>;
    version: number;
    dataEventId: number;
};
export type CachedFileMetadata = {
    blobUrl: string;
    width?: number;
    height?: number;
};
export type CachedFile = {
    contentLocation: string | null;
    contentType: MediaType;
    data: Uint8Array;
    blobUrl: Map<any, CachedFileMetadata>;
};
export type RemoteCachedFile = CachedFile & {
    cacheControl?: string;
};
export type LockedComponent = {
    componentId: number;
    modules: Map<number, LockedModule>;
};
export type LockedModule = {
    moduleId: number;
    files: ReadonlyMap<string | null, CachedFile>;
    lockedBy: "lockModuleOnMemory" | "lockModuleOnMemoryEx";
    version: number;
    dataEventId: number;
};
export type DownloadComponentInfo = {
    componentId: number;
    modules: ReadonlyMap<number, ModuleListEntry>;
    dataEventId: number;
    returnToEntryFlag?: boolean;
};
interface ResourcesEventMap {
    "dataeventchanged": CustomEvent<{
        prevComponent: DownloadComponentInfo;
        component: DownloadComponentInfo;
        returnToEntryFlag?: boolean;
    }>;
    "moduleupdated": CustomEvent<{
        componentId: number;
        moduleId: number;
        version: number;
        dataEventId: number;
    }>;
    "componentupdated": CustomEvent<{
        component: DownloadComponentInfo;
    }>;
    "pmtupdated": CustomEvent<{
        prevComponents: Map<number, ComponentPMT>;
        components: Map<number, ComponentPMT>;
    }>;
}
interface CustomEventTarget<M> {
    addEventListener<K extends keyof M>(type: K, callback: EventListenerOrEventListenerObject, options?: AddEventListenerOptions | boolean): void;
    dispatchEvent<K extends keyof M>(event: M[K]): boolean;
    removeEventListener<K extends keyof M>(type: K, callback: EventListenerOrEventListenerObject, options?: EventListenerOptions | boolean): void;
}
export type ResourcesEventTarget = CustomEventTarget<ResourcesEventMap>;
export declare enum Profile {
    BS = 7,
    CS = 11,
    TrProfileA = 12,
    TrProfileC = 13
}
export declare class Resources {
    private readonly indicator?;
    private readonly eventTarget;
    private readonly ip;
    private readonly cachedRemoteResources;
    private readonly remoteResourceRequests;
    constructor(indicator: Indicator | undefined, ip: IP);
    private _profile?;
    get profile(): Profile | undefined;
    private _activeDocument;
    private _currentComponentId;
    private _currentModuleId;
    set activeDocument(doc: string | null);
    get activeDocument(): string | null;
    get currentComponentId(): number | null;
    get currentModuleId(): number | null;
    get currentDataEventId(): number | null;
    private cachedComponents;
    private downloadComponents;
    getCachedFileBlobUrl(file: CachedFile, key?: any): string;
    private lockedComponents;
    private pmtComponents;
    private pmtRetrieved;
    getCachedModule(componentId: number, moduleId: number): CachedModule | undefined;
    getPMTComponent(componentId: number): ComponentPMT | undefined;
    lockCachedModule(componentId: number, moduleId: number, lockedBy: "lockModuleOnMemory" | "lockModuleOnMemoryEx"): boolean;
    isModuleLocked(componentId: number, moduleId: number): boolean;
    getModuleLockedBy(componentId: number, moduleId: number): "lockModuleOnMemory" | "lockModuleOnMemoryEx" | undefined;
    unlockModules(lockedBy?: "lockModuleOnMemory" | "lockModuleOnMemoryEx"): void;
    private revokeCachedFile;
    private revokeCachedModule;
    private revokeCachedComponent;
    unlockModule(componentId: number, moduleId: number, lockedBy: "lockModuleOnMemory" | "lockModuleOnMemoryEx"): boolean;
    componentExistsInDownloadInfo(componentId: number): boolean;
    getDownloadComponentInfo(componentId: number): DownloadComponentInfo | undefined;
    moduleExistsInDownloadInfo(componentId: number, moduleId: number): boolean;
    private currentProgramInfo;
    get dataCarouselURI(): string;
    get serviceURI(): string;
    get eventURI(): string;
    get eventName(): string | null;
    get eventId(): number | null;
    get contentId(): number | null;
    get startTimeUnixMillis(): number | null;
    get durationSeconds(): number | null;
    get serviceId(): number | null;
    get originalNetworkId(): number | null;
    get networkId(): number | null;
    get transportStreamId(): number | null;
    private currentTimeNearestPCRBase?;
    private _currentTimeUnixMillis?;
    private maxTOTIntervalMillis;
    get currentTimeUnixMillis(): number | null;
    nearestPCRBase?: number;
    onMessage(msg: ResponseMessage): void;
    private removeDCReferencePrefix;
    parseURL(url: string | null | undefined): {
        component: string | null;
        module: string | null;
        filename: string | null;
    };
    parseURLEx(url: string | null | undefined): {
        componentId: number | null;
        moduleId: number | null;
        filename: string | null;
    };
    parseAudioReference(url: string): {
        componentId: number | null;
        channelId: number | null;
    };
    mainAudioComponentId?: number;
    mainAudioChannelId?: number;
    get defaultAudioComponentId(): number;
    fetchLockedResource(url: string): CachedFile | null;
    private componentRequests;
    private fetchRemoteResource;
    invalidateRemoteCache(url: string): void;
    fetchResourceAsync(url: string, requestType?: "lockModuleOnMemory" | "lockModuleOnMemoryEx"): Promise<CachedFile | null>;
    getLockedModules(): Generator<{
        module: string;
        isEx: boolean;
        requesting: boolean;
    }>;
    private programInfoCallbacks;
    getProgramInfoAsync(): Promise<ProgramInfoMessage>;
    parseServiceReference(serviceRef: string): {
        originalNetworkId: number | null;
        transportStreamId: number | null;
        serviceId: number | null;
    };
    private setReceivingStatus;
    addEventListener<K extends keyof ResourcesEventMap>(type: K, callback: (this: undefined, evt: ResourcesEventMap[K]) => void, options?: AddEventListenerOptions | boolean): void;
    removeEventListener<K extends keyof ResourcesEventMap>(type: K, callback: (this: undefined, evt: ResourcesEventMap[K]) => void, options?: AddEventListenerOptions | boolean): void;
    clearCache(): void;
    get startupComponentId(): number;
    get startupModuleId(): number;
    get isInternetContent(): boolean;
    baseURIDirectory: string | null;
    setBaseURIDirectory(baseURIDirectory: string): void;
    checkBaseURIDirectory(url: string): boolean;
}
export {};
//# sourceMappingURL=resource.d.ts.map