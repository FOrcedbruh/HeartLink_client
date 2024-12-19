import type { ModifyHTMLTagsFn, NormalizedEnvironmentConfig, RsbuildPlugin } from '../types';
export declare function getTemplate(entryName: string, config: NormalizedEnvironmentConfig, rootPath: string): Promise<{
    templatePath: string;
    templateContent?: string;
} | {
    templatePath: undefined;
    templateContent: string;
}>;
export declare const pluginHtml: (modifyTagsFn?: (environment: string) => ModifyHTMLTagsFn) => RsbuildPlugin;
