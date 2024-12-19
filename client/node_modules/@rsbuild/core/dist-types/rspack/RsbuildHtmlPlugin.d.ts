import type { Compiler } from '@rspack/core';
import type { HtmlRspackPlugin } from '../types';
import type { EnvironmentContext, HtmlTag, HtmlTagDescriptor, ModifyHTMLTagsFn } from '../types';
type HtmlTagObject = HtmlRspackPlugin.HtmlTagObject;
export type TagConfig = {
    tags?: HtmlTagDescriptor[];
    hash?: HtmlTag['hash'];
    append?: HtmlTag['append'];
    publicPath?: HtmlTag['publicPath'];
};
export declare const FILE_ATTRS: {
    link: string;
    script: string;
};
export type HtmlInfo = {
    favicon?: string;
    tagConfig?: TagConfig;
    templateContent?: string;
};
export type RsbuildHtmlPluginOptions = Record<string, HtmlInfo>;
export type AlterAssetTagGroupsData = {
    headTags: HtmlTagObject[];
    bodyTags: HtmlTagObject[];
    outputName: string;
    publicPath: string;
    plugin: HtmlRspackPlugin;
};
export declare const hasTitle: (html?: string) => boolean;
export declare class RsbuildHtmlPlugin {
    readonly name: string;
    readonly getEnvironment: () => EnvironmentContext;
    readonly options: RsbuildHtmlPluginOptions;
    readonly modifyTagsFn?: ModifyHTMLTagsFn;
    constructor(options: RsbuildHtmlPluginOptions, getEnvironment: () => EnvironmentContext, modifyTagsFn?: ModifyHTMLTagsFn);
    apply(compiler: Compiler): void;
}
export {};
