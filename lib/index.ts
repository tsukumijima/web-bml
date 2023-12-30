// (window / document などの DOM API が存在しない) Web Worker や Node.js 環境からこの index.ts をインポートした場合、
// 下記の ../client/ 以下で定義されているブラウザ向けライブラリの再帰的インポートが行われた時点で DOM API の未定義により例外が発生してしまう
// これを避けるため、window が定義されていない環境では window に globalThis を代入し、インポートだけは通るようにしておく
// それ以外は Polyfill できないので、やむを得ず空のオブジェクトを代入する
if (typeof window === 'undefined') {
    (globalThis as any).window = globalThis;
}
if (typeof document === 'undefined') {
    (globalThis as any).document = {};
}
if (typeof location === 'undefined') {
    (globalThis as any).location = {};
}
if (typeof navigator === 'undefined') {
    (globalThis as any).navigator = {};
}
if (typeof screen === 'undefined') {
    (globalThis as any).screen = {};
}

export * from './decode_ts';
export * from './entity_parser';
export * from './ws_api';
export * from '../client/interface/BMLCSS2Properties';
export * from '../client/interface/DOM';
export * from '../client/interpreter/interpreter';
export * from '../client/interpreter/js_interpreter';
export * from '../client/player/caption_player';
export * from '../client/player/hls';
export * from '../client/player/mp4';
export * from '../client/player/mpegts';
export * from '../client/player/null';
export * from '../client/player/video_player';
export * from '../client/player/webm';
export * from '../client/util/logging';
export * from '../client/arib_aiff';
export * from '../client/arib_jpeg';
export * from '../client/arib_mng';
export * from '../client/arib_png';
export * from '../client/binary_table';
export * from '../client/bml_browser';
export * from '../client/bml_to_xhtml';
export * from '../client/broadcaster_4';
export * from '../client/broadcaster_6';
export * from '../client/broadcaster_7';
export * from '../client/broadcaster_database';
export * from '../client/browser';
export * from '../client/clut';
export * from '../client/content';
export * from '../client/date';
export * from '../client/default_c_css';
export * from '../client/default_clut';
export * from '../client/default_css';
export * from '../client/drcs';
export * from '../client/euc_jp';
export * from '../client/event_queue';
export * from '../client/jis_to_unicode_map';
export * from '../client/number';
export * from '../client/nvram';
export * from '../client/overlay_input';
export * from '../client/remote_controller';
export * from '../client/remote_controller_client';
export * from '../client/resource';
export * from '../client/romsound';
export * from '../client/romsound_data';
export * from '../client/shift_jis';
export * from '../client/string';
export * from '../client/text';
export * from '../client/transpile_css';
export * from '../client/unicode_to_jis_map';
export * from '../client/zip_code';
