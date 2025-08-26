import { ResponseMessage } from "../lib/ws_api";
import { BroadcasterDatabase } from "./broadcaster_database";
import { BrowserAPI } from "./browser";
import { Content } from "./content";
import { NVRAM } from "./nvram";
export interface AudioNodeProvider {
    getAudioDestinationNode(): AudioNode;
}
export interface Indicator {
    setUrl(name: string, loading: boolean): void;
    setReceivingStatus(receiving: boolean): void;
    setNetworkingGetStatus(get: boolean): void;
    setNetworkingPostStatus(post: boolean): void;
    setEventName(eventName: string | null): void;
}
export interface EPG {
    tune?(originalNetworkId: number, transportStreamId: number, serviceId: number): boolean | never;
    tuneToComponent?(originalNetworkId: number, transportStreamId: number, serviceId: number, component: string): boolean | never;
}
export interface IP {
    isIPConnected?(): number;
    getConnectionType?(): number;
    transmitTextDataOverIP?(uri: string, body: Uint8Array<ArrayBuffer>): Promise<{
        resultCode: number;
        statusCode: string;
        response: Uint8Array;
    }>;
    get?(uri: string): Promise<{
        response?: Uint8Array<ArrayBuffer>;
        headers?: Headers;
        statusCode?: number;
    }>;
    confirmIPNetwork?(destination: string, isICMP: boolean, timeoutMillis: number): Promise<{
        success: boolean;
        ipAddress: string | null;
        responseTimeMillis: number | null;
    } | null>;
}
export type InputCharacterType = "all" | "number" | "alphabet" | "hankaku" | "zenkaku" | "katakana" | "hiragana";
export declare const inputCharacters: Map<InputCharacterType, string>;
export type InputCancelReason = "other" | "unload" | "readonly" | "blur" | "invisible";
export type InputApplicationLaunchOptions = {
    characterType: InputCharacterType;
    allowedCharacters?: string;
    maxLength: number;
    value: string;
    inputMode: "text" | "password";
    multiline: boolean;
    callback: (value: string) => void;
};
/**
 * TR-B14 第二分冊 1.6 文字入力機能
 */
export interface InputApplication {
    /**
     * 文字入力アプリケーションを起動
     */
    launch(options: InputApplicationLaunchOptions): void;
    /**
     * 文字入力アプリケーションを終了
     * 起動中に文書の遷移、フォーカス移動、readonly属性の設定、invisible属性が有効になった場合など
     */
    cancel(reason: InputCancelReason): void;
}
export interface Reg {
    getReg(index: number): string | undefined;
    setReg(index: number, value: string): void;
}
export type KeyGroup = "basic" | "data-button" | "numeric-tuning" | "other-tuning" | "special-1" | "special-2";
export type BMLBrowserProfile = "C" | "A" | "BS" | "CS" | "";
interface BMLBrowserEventMap {
    "load": CustomEvent<{
        resolution: {
            width: number;
            height: number;
        };
        displayAspectRatio: {
            numerator: number;
            denominator: number;
        };
        profile: BMLBrowserProfile;
    }>;
    "invisible": CustomEvent<boolean>;
    /**
     * 動画の位置や大きさが変わった際に呼ばれるイベント
     * invisibleがtrueである場合渡される矩形に関わらず全面に表示する必要がある
     */
    "videochanged": CustomEvent<{
        clientRect: {
            left: number;
            top: number;
            right: number;
            bottom: number;
        };
        boundingRect: DOMRect;
    }>;
    "usedkeylistchanged": CustomEvent<{
        usedKeyList: Set<KeyGroup>;
    }>;
    "audiostreamchanged": CustomEvent<{
        componentId: number;
        channelId?: number;
    }>;
}
interface CustomEventTarget<M> {
    addEventListener<K extends keyof M>(type: K, callback: EventListenerOrEventListenerObject, options?: AddEventListenerOptions | boolean): void;
    dispatchEvent<K extends keyof M>(event: M[K]): boolean;
    removeEventListener<K extends keyof M>(type: K, callback: EventListenerOrEventListenerObject, options?: EventListenerOptions | boolean): void;
}
export type BMLBrowserEventTarget = CustomEventTarget<BMLBrowserEventMap>;
export type BMLBrowserFontFace = {
    source: string | BufferSource;
    descriptors?: FontFaceDescriptors | undefined;
};
export type BMLBrowserFonts = {
    roundGothic?: BMLBrowserFontFace;
    boldRoundGothic?: BMLBrowserFontFace;
    squareGothic?: BMLBrowserFontFace;
};
export declare const bmlBrowserFontNames: Readonly<{
    roundGothic: "丸ゴシック";
    boldRoundGothic: "太丸ゴシック";
    squareGothic: "角ゴシック";
}>;
export type BMLBrowserOptions = {
    containerElement: HTMLElement;
    mediaElement: HTMLElement;
    indicator?: Indicator;
    fonts?: BMLBrowserFonts;
    storagePrefix?: string;
    nvramPrefix?: string;
    broadcasterDatabasePrefix?: string;
    tabIndex?: number;
    epg?: EPG;
    /**
     * 動画像プレーンモードを有効化
     * 動画像が配置されている部分が切り抜かれるためvideochangedイベントに合わせて動画を配置する
     */
    videoPlaneModeEnabled?: boolean;
    tunnelPointerToVideoPlaneEnabled?: boolean;
    audioNodeProvider?: AudioNodeProvider;
    ip?: IP;
    inputApplication?: InputApplication;
    ureg?: Reg;
    greg?: Reg;
    setMainAudioStreamCallback?: (componentId: number, channelId?: number) => boolean;
    X_DPA_startResidentApp?: (appName: string, showAV: number, returnURI: string, Ex_info: string[]) => number;
    /**
     * エラーメッセージを表示
     * 未指定の時は<dialog>とshowModalが使われる
     */
    showErrorMessage?: (title: string, message: string, code?: string) => void;
};
export declare class BMLBrowser {
    private containerElement;
    private shadowRoot;
    private documentElement;
    private interpreter;
    readonly nvram: NVRAM;
    readonly browserAPI: BrowserAPI;
    private mediaElement;
    private resources;
    private eventQueue;
    private eventDispatcher;
    readonly broadcasterDatabase: BroadcasterDatabase;
    readonly content: Content;
    private readonly bmlDocument;
    private indicator?;
    private eventTarget;
    private fonts;
    private readonly epg;
    private readonly defaultAudioNodeProvider?;
    constructor(options: BMLBrowserOptions);
    emitMessage(msg: ResponseMessage): void;
    addEventListener<K extends keyof BMLBrowserEventMap>(type: K, callback: (this: undefined, evt: BMLBrowserEventMap[K]) => void, options?: AddEventListenerOptions | boolean): void;
    removeEventListener<K extends keyof BMLBrowserEventMap>(type: K, callback: (this: undefined, evt: BMLBrowserEventMap[K]) => void, options?: AddEventListenerOptions | boolean): void;
    getVideoElement(): HTMLElement | null;
    destroy(): Promise<void>;
    setMainAudioStream(componentId: number, channelId?: number): void;
}
export {};
//# sourceMappingURL=bml_browser.d.ts.map