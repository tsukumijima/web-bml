"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.playRomSound = exports.OverlayInputApplication = exports.AribKeyCode = exports.keyCodeToAribKey = exports.BMLBrowser = exports.bmlBrowserFontNames = exports.inputCharacters = void 0;
const broadcaster_database_1 = require("./broadcaster_database");
const browser_1 = require("./browser");
const content_1 = require("./content");
Object.defineProperty(exports, "keyCodeToAribKey", { enumerable: true, get: function () { return content_1.keyCodeToAribKey; } });
Object.defineProperty(exports, "AribKeyCode", { enumerable: true, get: function () { return content_1.AribKeyCode; } });
const event_queue_1 = require("./event_queue");
const DOM_1 = require("./interface/DOM");
const es2_interpreter_1 = require("./interpreter/es2_interpreter");
const nvram_1 = require("./nvram");
const resource_1 = require("./resource");
const logger_1 = require("./util/logger");
const overlay_input_1 = require("./overlay_input");
Object.defineProperty(exports, "OverlayInputApplication", { enumerable: true, get: function () { return overlay_input_1.OverlayInputApplication; } });
const romsound_1 = require("./romsound");
Object.defineProperty(exports, "playRomSound", { enumerable: true, get: function () { return romsound_1.playRomSound; } });
class DefaultAudioNodeProvider {
    audioContext = new AudioContext();
    getAudioDestinationNode() {
        return this.audioContext.destination;
    }
    destroy() {
        this.audioContext.close();
    }
}
const hankakuNumber = "0123456789";
const hankakuAlphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const hankakuSymbol = " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
const zenkakuHiragana = "ぁあぃいぅうぇえぉおかがきぎくぐけげこごさざしじすずせぜそぞただちぢっつづてでとどなにぬねのはばぱひびぴふぶぷへべぺほぼぽまみむめもゃやゅゆょよらりるれろゎわをん";
const zenkakuKatakana = "ァアィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロヮワヲン";
const zenkakuNumber = "０１２３４５６７８９";
const zenkakuAlphabet = "ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ";
const zenkakuSymbol = "　、。・ー―「」";
exports.inputCharacters = new Map([
    ["number", hankakuNumber],
    ["alphabet", hankakuAlphabet + hankakuSymbol],
    ["hankaku", hankakuAlphabet + hankakuNumber + hankakuSymbol],
    ["zenkaku", zenkakuHiragana + zenkakuKatakana + zenkakuAlphabet + zenkakuNumber + zenkakuSymbol],
    ["katakana", zenkakuKatakana + zenkakuSymbol],
    ["hiragana", zenkakuHiragana + zenkakuSymbol],
]);
exports.bmlBrowserFontNames = Object.freeze({
    roundGothic: "丸ゴシック",
    boldRoundGothic: "太丸ゴシック",
    squareGothic: "角ゴシック",
});
class BMLBrowser {
    containerElement;
    shadowRoot;
    documentElement;
    interpreter;
    nvram;
    browserAPI;
    mediaElement;
    resources;
    eventQueue;
    eventDispatcher;
    broadcasterDatabase;
    content;
    bmlDocument;
    indicator;
    eventTarget = new EventTarget();
    fonts = [];
    epg;
    defaultAudioNodeProvider;
    constructor(options) {
        this.containerElement = options.containerElement;
        this.mediaElement = options.mediaElement;
        this.indicator = options.indicator;
        this.shadowRoot = options.containerElement.attachShadow({ mode: "closed" });
        this.documentElement = document.createElement("html");
        if (options.tabIndex != null) {
            this.documentElement.tabIndex = options.tabIndex;
        }
        this.shadowRoot.appendChild(this.documentElement);
        let audioNodeProvider = options.audioNodeProvider;
        if (audioNodeProvider == null) {
            this.defaultAudioNodeProvider = new DefaultAudioNodeProvider();
            audioNodeProvider = this.defaultAudioNodeProvider;
        }
        this.epg = options.epg ?? {};
        function setupLogger(channel) {
            return new logger_1.Logger(`${options.log?.prefix ?? "[web-bml]"}[${channel}] `, options.log?.channels?.[channel]?.level ?? options.log?.level);
        }
        const interpreterLogger = setupLogger("interpreter");
        const eventQueueLogger = setupLogger("event-queue");
        const resourcesLogger = setupLogger("resources");
        const broadcasterDatabaseLogger = setupLogger("broadcaster-database");
        const nvramLogger = setupLogger("nvram");
        const domLogger = setupLogger("dom");
        const eventLogger = setupLogger("event-dispatcher");
        const contentLogger = setupLogger("content");
        const browserLogger = setupLogger("browser");
        this.interpreter = new es2_interpreter_1.ES2Interpreter(interpreterLogger, browserLogger);
        this.eventQueue = new event_queue_1.EventQueue(this.interpreter, eventQueueLogger);
        this.resources = new resource_1.Resources(this.indicator, options.ip ?? {}, resourcesLogger);
        this.broadcasterDatabase = new broadcaster_database_1.BroadcasterDatabase(this.resources, broadcasterDatabaseLogger, (options.storagePrefix ?? "") + (options.broadcasterDatabasePrefix ?? ""));
        this.broadcasterDatabase.openDatabase();
        this.nvram = new nvram_1.NVRAM(this.resources, this.broadcasterDatabase, nvramLogger, (options.storagePrefix ?? "") + (options.nvramPrefix ?? "nvram_"));
        this.bmlDocument = new DOM_1.BML.BMLDocument(this.documentElement, this.interpreter, this.eventQueue, this.resources, this.eventTarget, audioNodeProvider, options.inputApplication, options.setMainAudioStreamCallback, domLogger);
        this.eventDispatcher = new event_queue_1.EventDispatcher(this.eventQueue, this.bmlDocument, this.resources, eventLogger);
        this.eventQueue.dispatchBlur = this.eventDispatcher.dispatchBlur.bind(this.eventDispatcher);
        this.eventQueue.dispatchClick = this.eventDispatcher.dispatchClick.bind(this.eventDispatcher);
        this.eventQueue.dispatchFocus = this.eventDispatcher.dispatchFocus.bind(this.eventDispatcher);
        this.eventQueue.dispatchChange = this.eventDispatcher.dispatchChange.bind(this.eventDispatcher);
        this.content = new content_1.Content(this.bmlDocument, this.documentElement, this.resources, this.eventQueue, this.eventDispatcher, this.interpreter, this.mediaElement, this.eventTarget, this.indicator, options.videoPlaneModeEnabled ?? false, options.tunnelPointerToVideoPlaneEnabled ?? false, options.inputApplication, options.showErrorMessage, contentLogger);
        this.browserAPI = new browser_1.BrowserAPI(this.resources, this.eventQueue, this.eventDispatcher, this.content, this.nvram, this.interpreter, audioNodeProvider, options.ip ?? {}, this.indicator, options.ureg, options.greg, options.X_DPA_startResidentApp, browserLogger);
        this.interpreter.setupEnvironment(this.browserAPI, this.resources, this.content, this.epg);
        if (options.fonts?.roundGothic) {
            this.fonts.push(new FontFace(exports.bmlBrowserFontNames.roundGothic, options.fonts?.roundGothic.source, options.fonts?.roundGothic.descriptors));
        }
        if (options.fonts?.boldRoundGothic) {
            this.fonts.push(new FontFace(exports.bmlBrowserFontNames.roundGothic, options.fonts?.boldRoundGothic.source, { ...options.fonts?.boldRoundGothic.descriptors, weight: "bold" }));
            this.fonts.push(new FontFace(exports.bmlBrowserFontNames.boldRoundGothic, options.fonts?.boldRoundGothic.source, options.fonts?.boldRoundGothic.descriptors));
        }
        else if (options.fonts?.roundGothic) {
            this.fonts.push(new FontFace(exports.bmlBrowserFontNames.boldRoundGothic, options.fonts?.roundGothic.source, options.fonts?.roundGothic.descriptors));
        }
        if (options.fonts?.squareGothic) {
            this.fonts.push(new FontFace(exports.bmlBrowserFontNames.squareGothic, options.fonts?.squareGothic.source, options.fonts?.squareGothic.descriptors));
        }
        for (const font of this.fonts) {
            document.fonts.add(font);
        }
    }
    emitMessage(msg) {
        if (msg.type === "programInfo") {
            this.indicator?.setEventName(msg.eventName);
        }
        this.resources.onMessage(msg);
        this.broadcasterDatabase.onMessage(msg);
        this.browserAPI.onMessage(msg);
        this.content.onMessage(msg);
    }
    addEventListener(type, callback, options) {
        this.eventTarget.addEventListener(type, callback, options);
    }
    removeEventListener(type, callback, options) {
        this.eventTarget.removeEventListener(type, callback, options);
    }
    getVideoElement() {
        return this.documentElement.querySelector("object[arib-type=\"video/X-arib-mpeg2\"]");
    }
    async destroy() {
        for (const font of this.fonts) {
            document.fonts.delete(font);
        }
        this.fonts.length = 0;
        await this.content.exitDocument();
        if (this.defaultAudioNodeProvider != null) {
            this.defaultAudioNodeProvider.destroy();
        }
    }
    setMainAudioStream(componentId, channelId) {
        const { mainAudioComponentId: prevComponentId, mainAudioChannelId: prevChannelId } = this.resources;
        if (componentId === prevComponentId && channelId === prevChannelId) {
            return;
        }
        this.resources.mainAudioComponentId = componentId;
        this.resources.mainAudioChannelId = channelId;
        if (prevComponentId == null) {
            return;
        }
        this.eventDispatcher.dispatchMainAudioStreamChangedEvent(prevComponentId, prevChannelId, componentId, channelId);
    }
}
exports.BMLBrowser = BMLBrowser;
//# sourceMappingURL=bml_browser.js.map