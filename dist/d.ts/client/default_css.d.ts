export declare const defaultCSS = "\n\n/* STD-B24 Annex A Default Style Sheet */\n/* margin */\ndiv, p, input, object {margin: 0 !important}\n/* padding */\ndiv, object {padding-top : 0 !important; padding-right : 0 !important; padding-bottom : 0 !important; padding-left : 0 !important; }\n/* border */\n:where(div, p, span, a, input) { border-width: 0; }\nobject {border-width : 0 !important; border-style : none !important}\n/* display */\nmeta, title, script, style, head, bml, bevent, beitem { display: none !important }\nbody, div, p, object, input { display : block !important }\nbr, span, a { display : inline !important }\n/* position */\np, div, object, input { position : absolute !important }\nbr, span, a { position : static !important }\n/* top left width height*/\n:where(p, div, input, object) { top: 0; left: 0; width: 0; height: 0; }\n/* z-index */\ndiv, p, br, span, a, input, object, body { z-index : auto !important }\n/* line-height */\n/* br, span, a { line-height : inherit !important } */\n/* visibility */\nbody { visibility : visible !important }\nspan, a { visibility : inherit !important }\n/* overflow */\np, div, input, object { overflow : hidden !important }\n/* background-repeat */\nbody { background-repeat : repeat !important }\n/* text */\n:where(p, input) { font-family: \"\u4E38\u30B4\u30B7\u30C3\u30AF\"; --font-size: 24px; --font-size-raw: 24px; }\n:where(span, a) { font-family: inherit; }\n:where(p, input) { text-align: left; }\n/* letter-spacing */\nspan, a { letter-spacing : inherit !important }\n/* white-space */\n/* CDATA? */\n/* p, input { white-space : normal !important } */\n/* background-color-index */\n:where(body) {\n    --clut-color-0: rgba(0, 0, 0, 1);\n    --clut-color-1: rgba(255, 0, 0, 1);\n    --clut-color-2: rgba(0, 255, 0, 1);\n    --clut-color-3: rgba(255, 255, 0, 1);\n    --clut-color-4: rgba(0, 0, 255, 1);\n    --clut-color-5: rgba(255, 0, 255, 1);\n    --clut-color-6: rgba(0, 255, 255, 1);\n    --clut-color-7: rgba(255, 255, 255, 1);\n    --clut-color-8: rgba(0, 0, 0, 0);\n    --clut-color-9: rgba(170, 0, 0, 1);\n    --clut-color-10: rgba(0, 170, 0, 1);\n    --clut-color-11: rgba(170, 170, 0, 1);\n    --clut-color-12: rgba(0, 0, 170, 1);\n    --clut-color-13: rgba(170, 0, 170, 1);\n    --clut-color-14: rgba(0, 170, 170, 1);\n    --clut-color-15: rgba(170, 170, 170, 1);\n    --clut-color-16: rgba(0, 0, 85, 1);\n    --clut-color-17: rgba(0, 85, 0, 1);\n    --clut-color-18: rgba(0, 85, 85, 1);\n    --clut-color-19: rgba(0, 85, 170, 1);\n    --clut-color-20: rgba(0, 85, 255, 1);\n    --clut-color-21: rgba(0, 170, 85, 1);\n    --clut-color-22: rgba(0, 170, 255, 1);\n    --clut-color-23: rgba(0, 255, 85, 1);\n    --clut-color-24: rgba(0, 255, 170, 1);\n    --clut-color-25: rgba(85, 0, 0, 1);\n    --clut-color-26: rgba(85, 0, 85, 1);\n    --clut-color-27: rgba(85, 0, 170, 1);\n    --clut-color-28: rgba(85, 0, 255, 1);\n    --clut-color-29: rgba(85, 85, 0, 1);\n    --clut-color-30: rgba(85, 85, 85, 1);\n    --clut-color-31: rgba(85, 85, 170, 1);\n    --clut-color-32: rgba(85, 85, 255, 1);\n    --clut-color-33: rgba(85, 170, 0, 1);\n    --clut-color-34: rgba(85, 170, 85, 1);\n    --clut-color-35: rgba(85, 170, 170, 1);\n    --clut-color-36: rgba(85, 170, 255, 1);\n    --clut-color-37: rgba(85, 255, 0, 1);\n    --clut-color-38: rgba(85, 255, 85, 1);\n    --clut-color-39: rgba(85, 255, 170, 1);\n    --clut-color-40: rgba(85, 255, 255, 1);\n    --clut-color-41: rgba(170, 0, 85, 1);\n    --clut-color-42: rgba(170, 0, 255, 1);\n    --clut-color-43: rgba(170, 85, 0, 1);\n    --clut-color-44: rgba(170, 85, 85, 1);\n    --clut-color-45: rgba(170, 85, 170, 1);\n    --clut-color-46: rgba(170, 85, 255, 1);\n    --clut-color-47: rgba(170, 170, 85, 1);\n    --clut-color-48: rgba(170, 170, 255, 1);\n    --clut-color-49: rgba(170, 255, 0, 1);\n    --clut-color-50: rgba(170, 255, 85, 1);\n    --clut-color-51: rgba(170, 255, 170, 1);\n    --clut-color-52: rgba(170, 255, 255, 1);\n    --clut-color-53: rgba(255, 0, 85, 1);\n    --clut-color-54: rgba(255, 0, 255, 1);\n    --clut-color-55: rgba(255, 85, 0, 1);\n    --clut-color-56: rgba(255, 85, 85, 1);\n    --clut-color-57: rgba(255, 85, 170, 1);\n    --clut-color-58: rgba(255, 85, 255, 1);\n    --clut-color-59: rgba(255, 170, 0, 1);\n    --clut-color-60: rgba(255, 170, 85, 1);\n    --clut-color-61: rgba(255, 170, 170, 1);\n    --clut-color-62: rgba(255, 170, 255, 1);\n    --clut-color-63: rgba(255, 255, 85, 1);\n    --clut-color-64: rgba(255, 255, 255, 1);\n    --clut-color-65: rgba(0, 0, 0, 0.5);\n    --clut-color-66: rgba(255, 0, 0, 0.5);\n    --clut-color-67: rgba(0, 255, 0, 0.5);\n    --clut-color-68: rgba(255, 255, 0, 0.5);\n    --clut-color-69: rgba(0, 0, 255, 0.5);\n    --clut-color-70: rgba(255, 0, 255, 0.5);\n    --clut-color-71: rgba(0, 255, 255, 0.5);\n    --clut-color-72: rgba(255, 255, 255, 0.5);\n    --clut-color-73: rgba(170, 0, 0, 0.5);\n    --clut-color-74: rgba(0, 170, 0, 0.5);\n    --clut-color-75: rgba(170, 170, 0, 0.5);\n    --clut-color-76: rgba(0, 0, 170, 0.5);\n    --clut-color-77: rgba(170, 0, 170, 0.5);\n    --clut-color-78: rgba(0, 170, 170, 0.5);\n    --clut-color-79: rgba(170, 170, 170, 0.5);\n    --clut-color-80: rgba(0, 0, 85, 0.5);\n    --clut-color-81: rgba(0, 85, 0, 0.5);\n    --clut-color-82: rgba(0, 85, 85, 0.5);\n    --clut-color-83: rgba(0, 85, 170, 0.5);\n    --clut-color-84: rgba(0, 85, 255, 0.5);\n    --clut-color-85: rgba(0, 170, 85, 0.5);\n    --clut-color-86: rgba(0, 170, 255, 0.5);\n    --clut-color-87: rgba(0, 255, 85, 0.5);\n    --clut-color-88: rgba(0, 255, 170, 0.5);\n    --clut-color-89: rgba(85, 0, 0, 0.5);\n    --clut-color-90: rgba(85, 0, 85, 0.5);\n    --clut-color-91: rgba(85, 0, 170, 0.5);\n    --clut-color-92: rgba(85, 0, 255, 0.5);\n    --clut-color-93: rgba(85, 85, 0, 0.5);\n    --clut-color-94: rgba(85, 85, 85, 0.5);\n    --clut-color-95: rgba(85, 85, 170, 0.5);\n    --clut-color-96: rgba(85, 85, 255, 0.5);\n    --clut-color-97: rgba(85, 170, 0, 0.5);\n    --clut-color-98: rgba(85, 170, 85, 0.5);\n    --clut-color-99: rgba(85, 170, 170, 0.5);\n    --clut-color-100: rgba(85, 170, 255, 0.5);\n    --clut-color-101: rgba(85, 255, 0, 0.5);\n    --clut-color-102: rgba(85, 255, 85, 0.5);\n    --clut-color-103: rgba(85, 255, 170, 0.5);\n    --clut-color-104: rgba(85, 255, 255, 0.5);\n    --clut-color-105: rgba(170, 0, 85, 0.5);\n    --clut-color-106: rgba(170, 0, 255, 0.5);\n    --clut-color-107: rgba(170, 85, 0, 0.5);\n    --clut-color-108: rgba(170, 85, 85, 0.5);\n    --clut-color-109: rgba(170, 85, 170, 0.5);\n    --clut-color-110: rgba(170, 85, 255, 0.5);\n    --clut-color-111: rgba(170, 170, 85, 0.5);\n    --clut-color-112: rgba(170, 170, 255, 0.5);\n    --clut-color-113: rgba(170, 255, 0, 0.5);\n    --clut-color-114: rgba(170, 255, 85, 0.5);\n    --clut-color-115: rgba(170, 255, 170, 0.5);\n    --clut-color-116: rgba(170, 255, 255, 0.5);\n    --clut-color-117: rgba(255, 0, 85, 0.5);\n    --clut-color-118: rgba(255, 0, 255, 0.5);\n    --clut-color-119: rgba(255, 85, 0, 0.5);\n    --clut-color-120: rgba(255, 85, 85, 0.5);\n    --clut-color-121: rgba(255, 85, 170, 0.5);\n    --clut-color-122: rgba(255, 85, 255, 0.5);\n    --clut-color-123: rgba(255, 170, 0, 0.5);\n    --clut-color-124: rgba(255, 170, 85, 0.5);\n    --clut-color-125: rgba(255, 170, 170, 0.5);\n    --clut-color-126: rgba(255, 170, 255, 0.5);\n    --clut-color-127: rgba(255, 255, 85, 0.5);\n    background-color: var(--clut-color-0);\n    --background-color: var(--clut-color-0);\n    --background-color-index: 0;\n}\n:where(div, p, span, a, input) {\n    background-color: var(--clut-color-8);\n    --background-color: var(--clut-color-8);\n    --background-color-index: 8;\n}\n/* ?? \u3053\u308C\u3060\u3068object\u304C\u900F\u904E\u3067\u304D\u306A\u304F\u306A\u308B */\n/* object { background-color : var(--clut-color-0) !important, --background-color: 0 !important;} */\n/* grayscale-color-index */\n:where(p, input) { --grayscale-color-index: 30 15; }\n\n/* reset UA CSS */\n:where(p) {\n    margin-block-start: 0;\n    margin-block-end: 0;\n    margin-inline-start: 0;\n    margin-inline-end: 0;\n}\np {\n    line-break: anywhere !important;\n}\nbody {\n    padding: 0!important; /* NHK BS1\u3068\u304Bbody\u306Bpadding: 6pt;\u304C\u3042\u3063\u3066\u5D29\u308C\u308B? */\n    margin: 0!important;\n}\n\n:where(body) {\n    font-family: \"\u4E38\u30B4\u30B7\u30C3\u30AF\", monospace;\n}\n\nobject[type=\"audio/X-arib-mpeg2-aac\"] {\n    visibility: hidden;\n}\n\nobject[type=\"image/X-arib-png\"] {\n    visibility: hidden !important;\n}\n\narib-style {\n    display: none;\n}\n\narib-script {\n    display: none;\n}\n\nbody[arib-loading] { display: none !important; }\n\n:where(html, bml) {\n    line-height: 1; /* Firefox */\n    --line-height: 1;\n    --line-height-raw: normal;\n}\n\nhtml {\n    position: absolute;\n    top: 0px;\n    left: 0px;\n    /* \u30BF\u30D6\u306F\u7A7A\u767D\u4E00\u6587\u5B57\u5206 (STD-B24 \u7B2C\u4E8C\u5206\u518A(2/2) \u4ED8\u5C5E2 5.3.2 \u88685-12) */\n    tab-size: 1;\n}\n\n/*\n<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n    <filter id=\"bt601bt709\">\n        <feColorMatrix in=\"SourceGraphic\" type=\"matrix\" values=\"\n         1.24452    -0.0671069  -0.0130327  0 -0.0730592157\n         0.117678    0.977255    0.0694469  0 -0.0730592157\n        -0.00828808 -0.0162712   1.18894    0 -0.0730592157\n         0           0           0          1  0\" />\n    </filter>\n</svg>\n*/\n\n/*\nFirefox\u3060\u3068\u4E0A\u624B\u304F\u52D5\u304B\u306A\u3044?\nobject[type=\"image/jpeg\"] {\n    filter: url('data:image/svg+xml, <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"><filter id=\"bt601bt709\"><feColorMatrix in=\"SourceGraphic\" type=\"matrix\" values=\"1.24452 -0.0671069 -0.0130327 0 -0.0730592157  0.117678 0.977255 0.0694469 0 -0.0730592157  -0.00828808 -0.0162712 1.18894 0 -0.0730592157  0 0 0 1 0\" /></filter></svg>#bt601bt709');\n}\n*/\n\n/* \u7D99\u627F\u3057\u306A\u3044\u62E1\u5F35\u7279\u6027\u306E\u521D\u671F\u5024 */\n:where(*) {\n    --used-key-list: basic data-button;\n    --border-left-color-index: 0;\n    --border-right-color-index: 0;\n    --border-top-color-index: 0;\n    --border-bottom-color-index: 0;\n}\n\narib-bg {\n    background-color: var(--background-color) !important; /* \u5168\u79F0\u30BB\u30EC\u30AF\u30BF\u5BFE\u7B56 */\n    background-image: var(--background-image2) !important;\n    width: 100% !important;\n    height: 100% !important;\n    position: absolute !important;\n    left: 0px !important;\n    top: 0px !important;\n}\n\narib-text, arib-cdata {\n    display: inline !important;\n    font: inherit !important;\n    letter-spacing: inherit !important;\n    text-align: inherit !important;\n    line-height: inherit !important;\n    visibility: unset !important;\n    border: none !important;\n}\n\np, input {\n    white-space: break-spaces !important;\n}\n\n";
//# sourceMappingURL=default_css.d.ts.map