export interface SimpleObject<T = unknown> {
    [k: string]: T;
  }
  
// eslint-disable-next-line @typescript-eslint/ban-types
export type ArgumentType<F extends Function> = F extends (...args: infer A) => any ? A[0] : never;

export type EmptyObject = Record<string, never>;

export type SimpleFunction = () => void;
