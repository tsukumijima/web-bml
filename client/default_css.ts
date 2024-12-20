export const defaultCSS = `

/* STD-B24 Annex A Default Style Sheet */
/* margin */
div, p, input, object {margin: 0 !important}
/* padding */
div, object {padding-top : 0 !important; padding-right : 0 !important; padding-bottom : 0 !important; padding-left : 0 !important; }
/* border */
:where(div, p, span, a, input) { border-width: 0; }
object {border-width : 0 !important; border-style : none !important}
/* display */
meta, title, script, style, head, bml, bevent, beitem { display: none !important }
body, div, p, object, input { display : block !important }
br, span, a { display : inline !important }
/* position */
p, div, object, input { position : absolute !important }
br, span, a { position : static !important }
/* top left width height*/
:where(p, div, input, object) { top: 0; left: 0; width: 0; height: 0; }
/* z-index */
div, p, br, span, a, input, object, body { z-index : auto !important }
/* line-height */
/* br, span, a { line-height : inherit !important } */
/* visibility */
body { visibility : visible !important }
span, a { visibility : inherit !important }
/* overflow */
p, div, input, object { overflow : hidden !important }
/* background-repeat */
body { background-repeat : repeat !important }
/* text */
:where(p, input) { font-family: "丸ゴシック"; --font-size: 24px; --font-size-raw: 24px; }
:where(span, a) { font-family: inherit; }
:where(p, input) { text-align: left; }
/* letter-spacing */
span, a { letter-spacing : inherit !important }
/* white-space */
/* CDATA? */
/* p, input { white-space : normal !important } */
/* background-color-index */
:where(body) {
    --clut-color-0: rgba(0, 0, 0, 1);
    --clut-color-1: rgba(255, 0, 0, 1);
    --clut-color-2: rgba(0, 255, 0, 1);
    --clut-color-3: rgba(255, 255, 0, 1);
    --clut-color-4: rgba(0, 0, 255, 1);
    --clut-color-5: rgba(255, 0, 255, 1);
    --clut-color-6: rgba(0, 255, 255, 1);
    --clut-color-7: rgba(255, 255, 255, 1);
    --clut-color-8: rgba(0, 0, 0, 0);
    --clut-color-9: rgba(170, 0, 0, 1);
    --clut-color-10: rgba(0, 170, 0, 1);
    --clut-color-11: rgba(170, 170, 0, 1);
    --clut-color-12: rgba(0, 0, 170, 1);
    --clut-color-13: rgba(170, 0, 170, 1);
    --clut-color-14: rgba(0, 170, 170, 1);
    --clut-color-15: rgba(170, 170, 170, 1);
    --clut-color-16: rgba(0, 0, 85, 1);
    --clut-color-17: rgba(0, 85, 0, 1);
    --clut-color-18: rgba(0, 85, 85, 1);
    --clut-color-19: rgba(0, 85, 170, 1);
    --clut-color-20: rgba(0, 85, 255, 1);
    --clut-color-21: rgba(0, 170, 85, 1);
    --clut-color-22: rgba(0, 170, 255, 1);
    --clut-color-23: rgba(0, 255, 85, 1);
    --clut-color-24: rgba(0, 255, 170, 1);
    --clut-color-25: rgba(85, 0, 0, 1);
    --clut-color-26: rgba(85, 0, 85, 1);
    --clut-color-27: rgba(85, 0, 170, 1);
    --clut-color-28: rgba(85, 0, 255, 1);
    --clut-color-29: rgba(85, 85, 0, 1);
    --clut-color-30: rgba(85, 85, 85, 1);
    --clut-color-31: rgba(85, 85, 170, 1);
    --clut-color-32: rgba(85, 85, 255, 1);
    --clut-color-33: rgba(85, 170, 0, 1);
    --clut-color-34: rgba(85, 170, 85, 1);
    --clut-color-35: rgba(85, 170, 170, 1);
    --clut-color-36: rgba(85, 170, 255, 1);
    --clut-color-37: rgba(85, 255, 0, 1);
    --clut-color-38: rgba(85, 255, 85, 1);
    --clut-color-39: rgba(85, 255, 170, 1);
    --clut-color-40: rgba(85, 255, 255, 1);
    --clut-color-41: rgba(170, 0, 85, 1);
    --clut-color-42: rgba(170, 0, 255, 1);
    --clut-color-43: rgba(170, 85, 0, 1);
    --clut-color-44: rgba(170, 85, 85, 1);
    --clut-color-45: rgba(170, 85, 170, 1);
    --clut-color-46: rgba(170, 85, 255, 1);
    --clut-color-47: rgba(170, 170, 85, 1);
    --clut-color-48: rgba(170, 170, 255, 1);
    --clut-color-49: rgba(170, 255, 0, 1);
    --clut-color-50: rgba(170, 255, 85, 1);
    --clut-color-51: rgba(170, 255, 170, 1);
    --clut-color-52: rgba(170, 255, 255, 1);
    --clut-color-53: rgba(255, 0, 85, 1);
    --clut-color-54: rgba(255, 0, 255, 1);
    --clut-color-55: rgba(255, 85, 0, 1);
    --clut-color-56: rgba(255, 85, 85, 1);
    --clut-color-57: rgba(255, 85, 170, 1);
    --clut-color-58: rgba(255, 85, 255, 1);
    --clut-color-59: rgba(255, 170, 0, 1);
    --clut-color-60: rgba(255, 170, 85, 1);
    --clut-color-61: rgba(255, 170, 170, 1);
    --clut-color-62: rgba(255, 170, 255, 1);
    --clut-color-63: rgba(255, 255, 85, 1);
    --clut-color-64: rgba(255, 255, 255, 1);
    --clut-color-65: rgba(0, 0, 0, 0.5);
    --clut-color-66: rgba(255, 0, 0, 0.5);
    --clut-color-67: rgba(0, 255, 0, 0.5);
    --clut-color-68: rgba(255, 255, 0, 0.5);
    --clut-color-69: rgba(0, 0, 255, 0.5);
    --clut-color-70: rgba(255, 0, 255, 0.5);
    --clut-color-71: rgba(0, 255, 255, 0.5);
    --clut-color-72: rgba(255, 255, 255, 0.5);
    --clut-color-73: rgba(170, 0, 0, 0.5);
    --clut-color-74: rgba(0, 170, 0, 0.5);
    --clut-color-75: rgba(170, 170, 0, 0.5);
    --clut-color-76: rgba(0, 0, 170, 0.5);
    --clut-color-77: rgba(170, 0, 170, 0.5);
    --clut-color-78: rgba(0, 170, 170, 0.5);
    --clut-color-79: rgba(170, 170, 170, 0.5);
    --clut-color-80: rgba(0, 0, 85, 0.5);
    --clut-color-81: rgba(0, 85, 0, 0.5);
    --clut-color-82: rgba(0, 85, 85, 0.5);
    --clut-color-83: rgba(0, 85, 170, 0.5);
    --clut-color-84: rgba(0, 85, 255, 0.5);
    --clut-color-85: rgba(0, 170, 85, 0.5);
    --clut-color-86: rgba(0, 170, 255, 0.5);
    --clut-color-87: rgba(0, 255, 85, 0.5);
    --clut-color-88: rgba(0, 255, 170, 0.5);
    --clut-color-89: rgba(85, 0, 0, 0.5);
    --clut-color-90: rgba(85, 0, 85, 0.5);
    --clut-color-91: rgba(85, 0, 170, 0.5);
    --clut-color-92: rgba(85, 0, 255, 0.5);
    --clut-color-93: rgba(85, 85, 0, 0.5);
    --clut-color-94: rgba(85, 85, 85, 0.5);
    --clut-color-95: rgba(85, 85, 170, 0.5);
    --clut-color-96: rgba(85, 85, 255, 0.5);
    --clut-color-97: rgba(85, 170, 0, 0.5);
    --clut-color-98: rgba(85, 170, 85, 0.5);
    --clut-color-99: rgba(85, 170, 170, 0.5);
    --clut-color-100: rgba(85, 170, 255, 0.5);
    --clut-color-101: rgba(85, 255, 0, 0.5);
    --clut-color-102: rgba(85, 255, 85, 0.5);
    --clut-color-103: rgba(85, 255, 170, 0.5);
    --clut-color-104: rgba(85, 255, 255, 0.5);
    --clut-color-105: rgba(170, 0, 85, 0.5);
    --clut-color-106: rgba(170, 0, 255, 0.5);
    --clut-color-107: rgba(170, 85, 0, 0.5);
    --clut-color-108: rgba(170, 85, 85, 0.5);
    --clut-color-109: rgba(170, 85, 170, 0.5);
    --clut-color-110: rgba(170, 85, 255, 0.5);
    --clut-color-111: rgba(170, 170, 85, 0.5);
    --clut-color-112: rgba(170, 170, 255, 0.5);
    --clut-color-113: rgba(170, 255, 0, 0.5);
    --clut-color-114: rgba(170, 255, 85, 0.5);
    --clut-color-115: rgba(170, 255, 170, 0.5);
    --clut-color-116: rgba(170, 255, 255, 0.5);
    --clut-color-117: rgba(255, 0, 85, 0.5);
    --clut-color-118: rgba(255, 0, 255, 0.5);
    --clut-color-119: rgba(255, 85, 0, 0.5);
    --clut-color-120: rgba(255, 85, 85, 0.5);
    --clut-color-121: rgba(255, 85, 170, 0.5);
    --clut-color-122: rgba(255, 85, 255, 0.5);
    --clut-color-123: rgba(255, 170, 0, 0.5);
    --clut-color-124: rgba(255, 170, 85, 0.5);
    --clut-color-125: rgba(255, 170, 170, 0.5);
    --clut-color-126: rgba(255, 170, 255, 0.5);
    --clut-color-127: rgba(255, 255, 85, 0.5);
    background-color: var(--clut-color-0);
    --background-color: var(--clut-color-0);
    --background-color-index: 0;
}
:where(div, p, span, a, input) {
    background-color: var(--clut-color-8);
    --background-color: var(--clut-color-8);
    --background-color-index: 8;
}
/* ?? これだとobjectが透過できなくなる */
/* object { background-color : var(--clut-color-0) !important, --background-color: 0 !important;} */
/* grayscale-color-index */
:where(p, input) { --grayscale-color-index: 30 15; }

/* reset UA CSS */
:where(p) {
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0;
    margin-inline-end: 0;
}
p {
    line-break: anywhere !important;
}
body {
    padding: 0!important; /* NHK BS1とかbodyにpadding: 6pt;があって崩れる? */
    margin: 0!important;
    color: black!important;
}

:where(body) {
    font-family: "丸ゴシック", monospace;
}

object[type="audio/X-arib-mpeg2-aac"] {
    visibility: hidden;
}

object[type="image/X-arib-png"] {
    visibility: hidden !important;
}

arib-style {
    display: none;
}

arib-script {
    display: none;
}

body[arib-loading] { display: none !important; }

:where(html, bml) {
    line-height: 1; /* Firefox */
    --line-height: 1;
    --line-height-raw: normal;
}

html {
    position: absolute;
    top: 0px;
    left: 0px;
    /* タブは空白一文字分 (STD-B24 第二分冊(2/2) 付属2 5.3.2 表5-12) */
    tab-size: 1;
}

/*
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <filter id="bt601bt709">
        <feColorMatrix in="SourceGraphic" type="matrix" values="
         1.24452    -0.0671069  -0.0130327  0 -0.0730592157
         0.117678    0.977255    0.0694469  0 -0.0730592157
        -0.00828808 -0.0162712   1.18894    0 -0.0730592157
         0           0           0          1  0" />
    </filter>
</svg>
*/

/*
Firefoxだと上手く動かない?
object[type="image/jpeg"] {
    filter: url('data:image/svg+xml, <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><filter id="bt601bt709"><feColorMatrix in="SourceGraphic" type="matrix" values="1.24452 -0.0671069 -0.0130327 0 -0.0730592157  0.117678 0.977255 0.0694469 0 -0.0730592157  -0.00828808 -0.0162712 1.18894 0 -0.0730592157  0 0 0 1 0" /></filter></svg>#bt601bt709');
}
*/

/* 継承しない拡張特性の初期値 */
:where(*) {
    --used-key-list: basic data-button;
    --border-left-color-index: 0;
    --border-right-color-index: 0;
    --border-top-color-index: 0;
    --border-bottom-color-index: 0;
}

arib-bg {
    background-color: var(--background-color) !important; /* 全称セレクタ対策 */
    background-image: var(--background-image2) !important;
    width: 100% !important;
    height: 100% !important;
    position: absolute !important;
    left: 0px !important;
    top: 0px !important;
}

arib-text, arib-cdata {
    display: inline !important;
    font: inherit !important;
    letter-spacing: inherit !important;
    text-align: inherit !important;
    line-height: inherit !important;
    visibility: unset !important;
    border: none !important;
}

p, input {
    white-space: break-spaces !important;
}

`;
