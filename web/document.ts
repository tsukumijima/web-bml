import css from "css";
import { bmlSetInterval, dispatchDataButtonPressed, eventQueueOnModuleUpdated, executeEventHandler, lockSyncEventQueue, processEventQueue, queueAsyncEvent, queueSyncEvent, resetCurrentEvent, resetEventQueue, setCurrentIntrinsicEvent, unlockSyncEventQueue } from "./event";
import { activeDocument, CachedFile, fetchLockedResource, lockCachedModule, parseURL, parseURLEx, LongJump } from "./resource";
import * as resource from "./resource";
import { browserStatus } from "./browser";
import { bmlToXHTML } from "../src/bml_to_xhtml";
// @ts-ignore
import defaultCss from "./default.css";
import { setRemoteControllerMessage } from "./remote_controller_client";
import { decodeEUCJP } from "../src/euc_jp";
import { defaultCLUT } from "../src/default_clut";
import { readCLUT } from "../src/clut";
import { transpileCSS } from "../src/transpile_css";
import { Buffer } from "buffer";

const videoContainer = document.getElementById("arib-video-container") as HTMLDivElement;

async function loadDocument(file: CachedFile, documentName: string): Promise<void> {
    // スクリプトが呼ばれているときにさらにスクリプトが呼ばれることはないがonunloadだけ例外
    browserStatus.interpreter.resetStack();
    const onunload = document.body.getAttribute("onunload");
    if (onunload != null) {
        await executeEventHandler(onunload);
    }
    resetEventQueue();
    resource.setActiveDocument(documentName);
    document.currentFocus = null;
    browserStatus.interpreter.reset();
    resource.unlockAllModule();
    browserStatus.currentDateMode = 0;
    const documentElement = document.createElement("html");
    try {
        documentElement.innerHTML = bmlToXHTML(file.data);
    } catch (e) {
        console.error(e);
    }
    const p = Array.from(document.documentElement.childNodes).filter(x => x.nodeName === "body" || x.nodeName === "head");
    const videoElementNew = documentElement.querySelector("[arib-type=\"video/X-arib-mpeg2\"]");
    document.documentElement.append(...Array.from(documentElement.children));
    if (videoElementNew != null) {
        videoElementNew.appendChild(videoContainer);
    }
    for (const n of p) {
        n.remove();
    }

    if (defaultCss != null) {
        const defaultStylesheet = document.createElement("style");
        defaultStylesheet.textContent = defaultCss;
        document.head.prepend(defaultStylesheet);
    }
    setRemoteControllerMessage(activeDocument + "\n" + (resource.currentProgramInfo?.eventName ?? ""));
    init();
    (document.body as any).invisible = (document.body as any).invisible;
    // フォーカスはonloadの前に当たるがonloadが実行されるまではイベントは実行されない
    // STD-B24 第二分冊(2/2) 第二編 付属1 5.1.3参照
    lockSyncEventQueue();
    try {
        findNavIndex(0)?.focus();
        for (const x of Array.from(document.querySelectorAll("script"))) {
            const s = document.createElement("script");
            x.remove();
            const src = x.getAttribute("src");
            if (src) {
                const res = fetchLockedResource(src);
                if (res !== null) {
                    // 非同期になってしまうのでこれは無し
                    //const url = URL.createObjectURL(new Blob([res.data], {
                    //    type: "text/javascript;encoding=euc-jp"
                    //}));
                    s.setAttribute("arib-src", src);
                    s.textContent = "// " + src + "\n" + decodeEUCJP(res.data);
                }
            } else {
                s.textContent = "// " + activeDocument + "\n" + x.textContent;
            }
            await browserStatus.interpreter.addScript(s.textContent ?? "", src ?? undefined);
            // document.body.appendChild(s);
        }
        const onload = document.body.getAttribute("onload");
        if (onload != null) {
            await executeEventHandler(onload);
        }
    }
    finally {
        unlockSyncEventQueue();
    }
    await processEventQueue();
    // 雑だけど動きはする
    bmlSetInterval(() => {
        const moduleLocked = document.querySelectorAll("beitem[type=\"ModuleUpdated\"]");
        moduleLocked.forEach(beitem => {
            if (beitem.getAttribute("subscribe") !== "subscribe") {
                return;
            }
            const moduleRef = beitem.getAttribute("module_ref");
            if (moduleRef == null) {
                return;
            }
            const { moduleId, componentId } = parseURLEx(moduleRef);
            if (moduleId == null || componentId == null) {
                return;
            }
            if (resource.moduleExistsInDownloadInfo(componentId, moduleId)) {
                if ((beitem as any).__prevStatus !== 2) {
                    eventQueueOnModuleUpdated(moduleRef, 2);
                    (beitem as any).__prevStatus = 2;
                }
            } else {
                if ((beitem as any).__prevStatus !== 1) {
                    eventQueueOnModuleUpdated(moduleRef, 1);
                    (beitem as any).__prevStatus = 1;
                }
            }
        });
    }, 1000);
    browserStatus.interpreter.destroyStack();
}

export function launchDocument(documentName: string) {
    const { component, module, filename } = parseURL(documentName);
    const componentId = Number.parseInt(component ?? "", 16);
    const moduleId = Number.parseInt(module ?? "", 16);
    if (!Number.isInteger(componentId) || !Number.isInteger(moduleId)) {
        return NaN;
    }
    resource.launchRequest(null, null);
    if (!lockCachedModule(componentId, moduleId, "system")) {
        console.error("FIXME");
        resource.launchRequest(documentName, () => {
            try {
                window.browser.launchDocument(documentName);
            } catch (e) {
                if (e instanceof LongJump) {
                    console.log("long jump");
                } else {
                    throw e;
                }
            }
        });
        browserStatus.interpreter.destroyStack();
    }
    const res = fetchLockedResource(documentName);
    if (res == null) {
        console.error("NOT FOUND");
        return NaN;
    }
    const ad = activeDocument;
    let normalizedDocument;
    if (filename != null) {
        normalizedDocument = `/${componentId.toString(16).padStart(2, "0")}/${moduleId.toString(16).padStart(4, "0")}/${filename}`;
    } else {
        normalizedDocument = `/${componentId.toString(16).padStart(2, "0")}/${moduleId.toString(16).padStart(4, "0")}`;
    }
    loadDocument(res, normalizedDocument);
    console.log("return ", ad, documentName);
    browserStatus.interpreter.destroyStack();
}

export enum AribKeyCode {
    Up = 1,
    Down = 2,
    Left = 3,
    Right = 4,
    Digit0 = 5,
    Digit1 = 6,
    Digit2 = 7,
    Digit3 = 8,
    Digit4 = 9,
    Digit5 = 10,
    Digit6 = 11,
    Digit7 = 12,
    Digit8 = 13,
    Digit9 = 14,
    Digit10 = 15,
    Digit11 = 16,
    Digit12 = 17,
    Enter = 18,
    Back = 19, // X
    DataButton = 20,
    BlueButton = 21, // B
    RedButton = 22, // R
    GreenButton = 23, // G
    YellowButton = 24, // Y
    DataButton1 = 25, // E
    DataButton2 = 26, // F
    Bookmark = 100,
}

type KeyGroup = "basic" | "data-button" | "numeric-tuning" | "other-tuning";

// TR-B14 第二分冊 5.3.1 表5-5参照
const keyCodeToKeyGroup = new Map<AribKeyCode, KeyGroup>([
    [AribKeyCode.Up, "basic"],
    [AribKeyCode.Down, "basic"],
    [AribKeyCode.Left, "basic"],
    [AribKeyCode.Right, "basic"],
    [AribKeyCode.Enter, "basic"],
    [AribKeyCode.Back, "basic"],
    [AribKeyCode.BlueButton, "data-button"],
    [AribKeyCode.RedButton, "data-button"],
    [AribKeyCode.GreenButton, "data-button"],
    [AribKeyCode.YellowButton, "data-button"],
    [AribKeyCode.Bookmark, "data-button"],
    [AribKeyCode.Digit0, "numeric-tuning"],
    [AribKeyCode.Digit1, "numeric-tuning"],
    [AribKeyCode.Digit2, "numeric-tuning"],
    [AribKeyCode.Digit3, "numeric-tuning"],
    [AribKeyCode.Digit4, "numeric-tuning"],
    [AribKeyCode.Digit5, "numeric-tuning"],
    [AribKeyCode.Digit6, "numeric-tuning"],
    [AribKeyCode.Digit7, "numeric-tuning"],
    [AribKeyCode.Digit8, "numeric-tuning"],
    [AribKeyCode.Digit9, "numeric-tuning"],
    [AribKeyCode.Digit10, "numeric-tuning"],
    [AribKeyCode.Digit11, "numeric-tuning"],
    [AribKeyCode.Digit12, "numeric-tuning"],
]);

export function keyCodeToAribKey(keyCode: string): AribKeyCode | -1 {
    // STD B-24 第二分冊(2/2) 第二編 A2 Table 5-9
    switch (keyCode) {
        case "ArrowUp":
            return AribKeyCode.Up;
        case "ArrowDown":
            return AribKeyCode.Down;
        case "ArrowLeft":
            return AribKeyCode.Left;
        case "ArrowRight":
            return AribKeyCode.Right;
        case "0":
            return AribKeyCode.Digit0;
        case "1":
            return AribKeyCode.Digit1;
        case "2":
            return AribKeyCode.Digit2;
        case "3":
            return AribKeyCode.Digit3;
        case "4":
            return AribKeyCode.Digit4;
        case "5":
            return AribKeyCode.Digit5;
        case "6":
            return AribKeyCode.Digit6;
        case "7":
            return AribKeyCode.Digit7;
        case "8":
            return AribKeyCode.Digit8;
        case "9":
            return AribKeyCode.Digit9;
        case "Enter":
        case "Space":
            return AribKeyCode.Enter;
        case "Backspace":
        case "X":
        case "x":
            return AribKeyCode.Back;
        case "D":
        case "d":
            return AribKeyCode.DataButton;
        case "B":
        case "b":
            return AribKeyCode.BlueButton;
        case "R":
        case "r":
            return AribKeyCode.RedButton;
        case "G":
        case "g":
            return AribKeyCode.GreenButton;
        case "Y":
        case "y":
            return AribKeyCode.YellowButton;
        case "E":
        case "e":
            return AribKeyCode.DataButton1;
        case "F":
        case "f":
            return AribKeyCode.DataButton2;
        default:
            return -1;
    }
}

export function findNavIndex(navIndex: number): HTMLElement | undefined {
    return Array.from(document.querySelectorAll("*")).find(elem => {
        return parseInt(window.getComputedStyle(elem).getPropertyValue("--nav-index")) == navIndex;
    }) as (HTMLElement | undefined);
}

export function processKeyDown(k: AribKeyCode) {
    if (k === AribKeyCode.DataButton) {
        // データボタンの場合DataButtonPressedのみが発生する
        try {
            dispatchDataButtonPressed();
        } catch (e) {
            if (e instanceof LongJump) {
                console.log("long jump");
            } else {
                throw e;
            }
        }
        return;
    }
    if (!document.currentFocus) {
        return;
    }
    const computedStyle = window.getComputedStyle(document.currentFocus);
    let nextFocus = "";
    const usedKeyList = computedStyle.getPropertyValue("--used-key-list").split(" ").filter(x => x.length);
    if (usedKeyList.length && usedKeyList[0] === "none") {
        return;
    }
    const keyGroup = keyCodeToKeyGroup.get(k);
    if (keyGroup == null) {
        return;
    }
    if (usedKeyList.length === 0) {
        if (keyGroup !== "basic" && keyGroup !== "data-button") {
            return;
        }
    } else if (!usedKeyList.some(x => x === keyGroup)) {
        return;
    }
    let nextFocusStyle = computedStyle;
    while (true) {
        if (k == AribKeyCode.Left) {
            // 明記されていなさそうだけどおそらく先にnav-indexによるフォーカス移動があるだろう
            nextFocus = nextFocusStyle.getPropertyValue("--nav-left");
        } else if (k == AribKeyCode.Right) {
            nextFocus = nextFocusStyle.getPropertyValue("--nav-right");
        } else if (k == AribKeyCode.Up) {
            nextFocus = nextFocusStyle.getPropertyValue("--nav-up");
        } else if (k == AribKeyCode.Down) {
            nextFocus = nextFocusStyle.getPropertyValue("--nav-down");
        }
        const nextFocusIndex = parseInt(nextFocus);
        if (Number.isFinite(nextFocusIndex) && nextFocusIndex >= 0 && nextFocusIndex <= 32767) {
            const next = findNavIndex(nextFocusIndex);
            if (next != null) {
                nextFocusStyle = window.getComputedStyle(next);
                // 非表示要素であれば飛ばされる (STD-B24 第二分冊 (1/2 第二編) 5.4.13.3参照)
                if (nextFocusStyle.visibility === "hidden") {
                    continue;
                }
                next?.focus();
            }
        }
        break;
    }
    const onkeydown = document.currentFocus.getAttribute("onkeydown");
    if (onkeydown) {
        queueAsyncEvent(async () => {
            setCurrentIntrinsicEvent({
                keyCode: k as number,
                type: "keydown",
                target: document.currentFocus,
            });
            try {
                lockSyncEventQueue();
                await executeEventHandler(onkeydown);
            } catch (e) {
                if (e instanceof LongJump) {
                    console.log("long jump");
                } else {
                    throw e;
                }
            } finally {
                unlockSyncEventQueue();
            }
            resetCurrentEvent();
            if (k == AribKeyCode.Enter && document.currentFocus) {
                queueSyncEvent({ type: "click", target: document.currentFocus });
            }
        });
        processEventQueue();
    }
}

export function processKeyUp(k: AribKeyCode) {
    if (k === AribKeyCode.DataButton) {
        return;
    }
    if (!document.currentFocus) {
        return;
    }
    const computedStyle = window.getComputedStyle(document.currentFocus);
    const usedKeyList = computedStyle.getPropertyValue("--used-key-list").split(" ").filter(x => x.length);
    if (usedKeyList.length && usedKeyList[0] === "none") {
        return;
    }
    const keyGroup = keyCodeToKeyGroup.get(k);
    if (keyGroup == null) {
        return;
    }
    if (usedKeyList.length === 0) {
        if (keyGroup !== "basic" && keyGroup !== "data-button") {
            return;
        }
    } else if (!usedKeyList.some(x => x === keyGroup)) {
        return;
    }
    const onkeyup = document.currentFocus.getAttribute("onkeyup");
    if (onkeyup) {
        queueAsyncEvent(async () => {
            setCurrentIntrinsicEvent({
                keyCode: k,
                type: "keyup",
                target: document.currentFocus,
            });
            try {
                lockSyncEventQueue();
                await executeEventHandler(onkeyup);
            } catch (e) {
                if (e instanceof LongJump) {
                    console.log("long jump");
                } else {
                    throw e;
                }
            } finally {
                unlockSyncEventQueue();
            }
            resetCurrentEvent();
        });
        processEventQueue();
    }
}

window.addEventListener("keydown", (event) => {
    const k = keyCodeToAribKey(event.key);
    if (k == -1) {
        return;
    }
    processKeyDown(k);
});

window.addEventListener("keyup", (event) => {
    const k = keyCodeToAribKey(event.key);
    if (k == -1) {
        return;
    }
    processKeyUp(k);
});

function reloadObjectElement(obj: HTMLObjectElement) {
    // chromeではこうでもしないとtypeの変更が反映されない
    // バグかも
    const dummy = document.createElement("dummy");
    obj.appendChild(dummy);
    dummy.remove();
}

function init() {
    function clutToDecls(table: number[][]): css.Declaration[] {
        const ret = [];
        let i = 0;
        for (const t of table) {
            const decl: css.Declaration = {
                type: "declaration",
                property: "--clut-color-" + i,
                value: `rgba(${t[0]},${t[1]},${t[2]},${t[3] / 255})`,
            };
            ret.push(decl);
            i++;
        }
        return ret;
    }

    function getCLUT(clutUrl: string): css.Declaration[] {
        const res = fetchLockedResource(clutUrl);
        let clut = defaultCLUT;
        if (res?.data) {
            clut = readCLUT(Buffer.from(res.data));
        }
        return clutToDecls(clut);
    }

    function convertCSSUrl(url: string): string {
        const res = fetchLockedResource(url);
        if (!res) {
            return url;
        }
        return resource.getCachedFileBlobUrl(res);
    }

    //observer.observe(document.body, config);
    document.querySelectorAll("arib-style, arib-link").forEach(style => {
        if (style.nodeName === "arib-link") {
            const href = style.getAttribute("href");
            if (href != null) {
                const newStyle = document.createElement("style");
                const res = fetchLockedResource(href);
                if (res != null) {
                    newStyle.textContent = transpileCSS(decodeEUCJP(res.data), { inline: false, href: "http://localhost" + activeDocument, clutReader: getCLUT, convertUrl: convertCSSUrl });
                    style.parentElement?.appendChild(newStyle);
                }
            }
        } else if (style.textContent) {
            const newStyle = document.createElement("style");
            newStyle.textContent = transpileCSS(style.textContent, { inline: false, href: "http://localhost" + activeDocument, clutReader: getCLUT, convertUrl: convertCSSUrl });
            style.parentElement?.appendChild(newStyle);
        }
    });

    document.querySelectorAll("[style]").forEach(style => {
        const styleAttribute = style.getAttribute("style");
        if (!styleAttribute) {
            return;
        }
        style.setAttribute("style", transpileCSS(styleAttribute, { inline: true, href: "http://localhost" + activeDocument, clutReader: getCLUT, convertUrl: convertCSSUrl }));
    });
    document.querySelectorAll("object").forEach(obj => {
        const adata = obj.getAttribute("arib-data");
        if (adata != null) {
            obj.data = adata;
            reloadObjectElement(obj);
        }
    });
}
