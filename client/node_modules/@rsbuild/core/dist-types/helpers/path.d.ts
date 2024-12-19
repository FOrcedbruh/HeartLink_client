export declare function getAbsolutePath(base: string, filepath: string): string;
export declare function getCommonParentPath(paths: string[]): string;
export declare const getCompiledPath: (packageName: string) => string;
/**
 * ensure absolute file path.
 * @param base - Base path to resolve relative from.
 * @param filePath - Absolute or relative file path.
 * @returns Resolved absolute file path.
 */
export declare const ensureAbsolutePath: (base: string, filePath: string) => string;
export declare const pathnameParse: (publicPath: string) => string;
