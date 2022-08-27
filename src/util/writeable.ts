/**
 * @author WMXPY
 * @namespace Util
 * @description Writeable
 */

// Internal
export type Writeable<T> = {
    -readonly [P in keyof T]: T[P];
};

// Internal
export type DeepWriteable<T> = {
    -readonly [P in keyof T]: DeepWriteable<T[P]>;
};
