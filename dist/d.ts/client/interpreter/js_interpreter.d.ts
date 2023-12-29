declare const Interpreter: any;
import { Interpreter } from "./interpreter";
import { Content } from "../content";
import { Resources } from "../resource";
import { BrowserAPI } from "../browser";
import { EPG } from "../bml_browser";
export declare class JSInterpreter implements Interpreter {
    interpreter: any;
    nativeProtoToPseudoObject: Map<any, any>;
    domObjectToPseudo(interpreter: any, object: any): any;
    domClassToPseudo(interpreter: any, prototype: any): any;
    registerDOMClasses(interpreter: any, globalObject: any): void;
    reset(): void;
    private _isExecuting;
    private browserAPI;
    private resources;
    private content;
    private epg;
    constructor();
    setupEnvironment(browserAPI: BrowserAPI, resources: Resources, content: Content, epg: EPG): void;
    addScript(script: string, src?: string): Promise<boolean>;
    exeNum: number;
    runScript(): Promise<boolean>;
    get isExecuting(): boolean;
    runEventHandler(funcName: string): Promise<boolean>;
    destroyStack(): void;
    resetStack(): void;
}
export {};
//# sourceMappingURL=js_interpreter.d.ts.map