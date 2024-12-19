import type { InternalContext, NormalizedConfig, PluginManager, ResolvedCreateRsbuildOptions, Rspack } from '../types';
export type InitConfigsOptions = {
    context: InternalContext;
    pluginManager: PluginManager;
    rsbuildOptions: ResolvedCreateRsbuildOptions;
};
export declare function initRsbuildConfig({ context, pluginManager, }: Pick<InitConfigsOptions, 'context' | 'pluginManager'>): Promise<NormalizedConfig>;
export declare function initConfigs({ context, pluginManager, rsbuildOptions, }: InitConfigsOptions): Promise<{
    rspackConfigs: Rspack.Configuration[];
}>;
