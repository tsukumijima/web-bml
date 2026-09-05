"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTextDecoder = getTextDecoder;
exports.getTextEncoder = getTextEncoder;
const euc_jp_1 = require("./euc_jp");
const shift_jis_1 = require("./shift_jis");
const resource_1 = require("./resource");
function getTextDecoder(profile) {
    if (profile === resource_1.Profile.TrProfileC) {
        return shift_jis_1.decodeShiftJIS;
    }
    else {
        return euc_jp_1.decodeEUCJP;
    }
}
function getTextEncoder(profile) {
    if (profile === resource_1.Profile.TrProfileC) {
        return shift_jis_1.encodeShiftJIS;
    }
    else {
        return euc_jp_1.encodeEUCJP;
    }
}
//# sourceMappingURL=text.js.map