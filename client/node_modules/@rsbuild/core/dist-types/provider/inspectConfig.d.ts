import type { InspectConfigOptions, InspectConfigResult, Rspack } from '../types';
import { type InitConfigsOptions } from './initConfigs';
export declare function inspectConfig({ context, pluginManager, rsbuildOptions, bundlerConfigs, inspectOptions, }: InitConfigsOptions & {
    inspectOptions?: InspectConfigOptions;
    bundlerConfigs?: Rspack.Configuration[];
}): Promise<InspectConfigResult<'rspack'>>;
