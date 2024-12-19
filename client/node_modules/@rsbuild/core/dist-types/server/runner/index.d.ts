import type { CompilerOptions, Runner, RunnerFactory } from './type';
export declare class BasicRunnerFactory implements RunnerFactory {
    protected name: string;
    constructor(name: string);
    create(compilerOptions: CompilerOptions, dist: string, readFileSync: (path: string) => string): Runner;
    protected createRunner(compilerOptions: CompilerOptions, dist: string, readFileSync: (path: string) => string): Runner;
}
export declare const run: <T>(bundlePath: string, outputPath: string, compilerOptions: CompilerOptions, readFileSync: (path: string) => string) => Promise<T>;
