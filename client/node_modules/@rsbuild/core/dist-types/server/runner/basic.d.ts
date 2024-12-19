import type { CompilerOptions, Runner } from './type';
import type { BasicGlobalContext, BasicModuleScope, BasicRunnerFile, ModuleObject, RunnerRequirer } from './type';
export interface IBasicRunnerOptions {
    name: string;
    runInNewContext?: boolean;
    readFileSync: (path: string) => string;
    dist: string;
    compilerOptions: CompilerOptions;
}
export declare abstract class BasicRunner implements Runner {
    protected _options: IBasicRunnerOptions;
    protected globalContext: BasicGlobalContext | null;
    protected baseModuleScope: BasicModuleScope | null;
    protected requirers: Map<string, RunnerRequirer>;
    constructor(_options: IBasicRunnerOptions);
    run(file: string): Promise<unknown>;
    getRequire(): RunnerRequirer;
    protected abstract createGlobalContext(): BasicGlobalContext;
    protected abstract createBaseModuleScope(): BasicModuleScope;
    protected abstract createModuleScope(requireFn: RunnerRequirer, m: ModuleObject, file: BasicRunnerFile): BasicModuleScope;
    protected getFile(modulePath: string[] | string, currentDirectory: string): BasicRunnerFile | null;
    protected preExecute(_code: string, _file: BasicRunnerFile): void;
    protected postExecute(_m: Record<string, any>, _file: BasicRunnerFile): void;
    protected createRunner(): void;
}
