import { Context, InterpreterObject, Program } from "../../es2";
import { Interpreter } from "./interpreter";
import { Content } from "../content";
import { Resources } from "../resource";
import { BrowserAPI } from "../browser";
import { EPG } from "../bml_browser";
export declare class ES2Interpreter implements Interpreter {
    context: Context;
    prototypes: Map<any, InterpreterObject>;
    map: WeakMap<any, InterpreterObject>;
    reset(): void;
    private _isExecuting;
    private browserAPI;
    private resources;
    private content;
    private epg;
    constructor();
    setupEnvironment(browserAPI: BrowserAPI, resources: Resources, content: Content, epg: EPG): void;
    addScript(script: string, src?: string): Promise<boolean>;
    private exeNum;
    runScript(program: Program): Promise<boolean>;
    get isExecuting(): boolean;
    runEventHandler(funcName: string): Promise<boolean>;
    destroyStack(): void;
    resetStack(): void;
}
//# sourceMappingURL=es2_interpreter.d.ts.map