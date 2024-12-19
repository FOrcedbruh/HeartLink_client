import vm from 'node:vm';
export declare const asModule: (something: Record<string, any>, context: Record<string, any>, unlinked?: boolean) => Promise<vm.SourceTextModule>;
