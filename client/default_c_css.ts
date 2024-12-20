export const defaultCProfileCSS = `

/* margin */
div, p, pre, form, input, textarea, object, img { margin: 0 !important }
/* padding */
div, form, object, img { padding-top: 0 !important; padding-right: 0 !important; padding-bottom: 0 !important; padding-left: 0 !important }
/* border */
:where(div, p, pre, form, input, textarea) { border-width: 0; border-top-color: transparent; border-right-color: transparent; border-bottom-color: transparent; border-left-color: transparent; }
object, img { border-width: 0 !important; border-style: none !important }
/* display */
/* html, */head, title, meta, script, link, bevent, beitem { display: none !important }
body, div, pre, form, input, textarea, object, img { display: block !important }
:where(p) { display: block }
br, span, a { display: inline !important }
/* position */
div, p, pre, form, input, textarea, object, img { position: absolute !important }
br, span, a { position: static !important }
/* top, left, width, height */
:where(div, p, pre, form, input, textarea, object, img) { top: 0; left: 0; width: 0; height: 0 }
/* z-index */
body, div, p, pre, br, span, a, form, input, textarea, object, img { z-index: auto !important }
/* line-height */
/* br, span, a { line-height: inherit !important } */
/* visibility */
body { visibility: visible !important }
span, a { visibility: inherit !important }
/* overflow */
div, p, pre, form, input, textarea, object, img { overflow: hidden !important }
/* color */
:where(p, pre, input, textarea) { color: black; --color: black; }
:where(span, a) { color: inherit }
/* background-color */
object, img { background-color: transparent !important; --background-color: transparent !important; --background-color-inherit: transparent !important; }
:where(body) { background-color: white; --background-color: white; --background-color-inherit: white; }
/* background-repeat */
body { background-repeat: repeat !important }
/* font-family */
p, pre, span, a, input, textarea { font-family: "丸ゴシック" !important }
/* text-align */
:where(p, input, textarea) { text-align: left }
/* white-space */
/* p, input { white-space: normal !important } */
pre, textarea { white-space: pre !important }
/* resolution */
body { --resolution: 240x480 !important }
/* marquee */
:where(p) { ---wap-marquee-loop: 1; }
p { ---wap-marquee-dir: rtl !important }

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
}

:where(body) {
    font-family: "丸ゴシック", monospace;
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
    /* TR-B14 第三分冊 8.1.9.2 表8-1 */
    --small: 16px;
    --medium: 20px;
    --large: 30px;
    /* タブは空白一文字分 (TR-B14 第三分冊 7.7.3 注4) */
    tab-size: 1;
    --font-size: var(--medium);
    --font-size-raw: medium;
}

/* 継承しない拡張特性の初期値 */
:where(*) {
    --used-key-list: basic;
    --background-color: ;
}

arib-bg {
    background-color: var(--background-color-inherit) !important; /* 全称セレクタ対策 */
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

arib-cdata {
    white-space: break-spaces !important;
}

:where(a[web-bml-state="focus"], a[web-bml-state="active"]) {
    /* background-color: var(--color) !important;
    color: var(--background-color-inherit) !important; */
    background-color: blue;
    color: white !important;
    outline: 1px blue dotted;
    outline-offset: -1px;
}

:where(p) {
    ---wap-marquee-speed: normal;
    ---wap-marquee-style: scroll;
}

:where(input, textarea) {
    ---wap-input-format: *M;
}

:where(html) {
    --background-color-inherit: white;
}

input[web-bml-state="focus"], input[web-bml-state="active"] {
    background-color: #a3ceff !important;
}

p, input {
    white-space: break-spaces !important;
}

textarea {
    resize: none;
}

object[web-bml-state="focus"], object[web-bml-state="active"], img[web-bml-state="focus"], img[web-bml-state="active"] {
    outline: 1px blue dotted;
    outline-offset: -1px;
}

`;
