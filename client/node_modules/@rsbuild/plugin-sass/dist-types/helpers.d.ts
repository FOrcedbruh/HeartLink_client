declare const GLOBAL_PATCHED_SYMBOL: unique symbol;
declare global {
    interface Location {
        [GLOBAL_PATCHED_SYMBOL]?: true;
    }
}
type CompilerTapFn<CallBack extends (...args: any[]) => void = () => void> = {
    tap: (name: string, cb: CallBack) => void;
};
export declare function patchCompilerGlobalLocation(compiler: {
    hooks: {
        run: CompilerTapFn;
        watchRun: CompilerTapFn;
        watchClose: CompilerTapFn;
        done: CompilerTapFn;
    };
}): void;
/**
 * fix resolve-url-loader can't deal with resolve.alias config
 *
 * reference: https://github.com/bholloway/resolve-url-loader/blob/e2695cde68f325f617825e168173df92236efb93/packages/resolve-url-loader/docs/advanced-features.md
 */
export declare const getResolveUrlJoinFn: () => Promise<(...args: unknown[]) => void>;
export {};
