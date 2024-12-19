import type { Compiler } from '@rspack/core';
import type { NormalizedPluginOptions, PluginOptions } from './options';
export type { PluginOptions };
declare class ReactRefreshRspackPlugin {
    options: NormalizedPluginOptions;
    static deprecated_runtimePaths: string[];
    constructor(options?: PluginOptions);
    apply(compiler: Compiler): void;
}
export = ReactRefreshRspackPlugin;
