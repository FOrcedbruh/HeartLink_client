import type { IncomingMessage } from 'node:http';
import type { Socket } from 'node:net';
import type { DevConfig, Rspack } from '../types';
export declare class SocketServer {
    private wsServer;
    private readonly sockets;
    private readonly options;
    private stats;
    private initialChunks;
    private timer;
    constructor(options: DevConfig);
    upgrade(req: IncomingMessage, sock: Socket, head: any): void;
    prepare(): Promise<void>;
    updateStats(stats: Rspack.Stats): void;
    sockWrite({ type, compilationId, data, }: {
        type: string;
        compilationId?: string;
        data?: Record<string, any> | string | boolean;
    }): void;
    private singleWrite;
    close(): void;
    private onConnect;
    private getStats;
    private sendStats;
    private send;
}
