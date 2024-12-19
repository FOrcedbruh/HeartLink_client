export type LoadEnvOptions = {
    /**
     * The root path to load the env file
     * @default process.cwd()
     */
    cwd?: string;
    /**
     * Used to specify the name of the .env.[mode] file
     * @default process.env.NODE_ENV
     */
    mode?: string;
    /**
     * The prefix of public variables
     * @default ['PUBLIC_']
     */
    prefixes?: string[];
};
export declare function loadEnv({ cwd, mode, prefixes, }?: LoadEnvOptions): {
    /** All environment variables in the .env file */
    parsed: Record<string, string>;
    /** The absolute paths to all env files */
    filePaths: string[];
    /** Environment variables that start with prefixes */
    publicVars: Record<string, string>;
    /** Clear the environment variables mounted on `process.env` */
    cleanup: () => void;
};
