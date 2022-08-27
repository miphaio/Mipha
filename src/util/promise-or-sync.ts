/**
 * @author WMXPY
 * @namespace Util
 * @description Promise Or Sync
 */

// Internal
export type PromiseOrSync<T> = Promise<T> | T;

// Internal
export type NullablePromiseOrSync<T> = PromiseOrSync<T | null>;

// Internal
export type NullablePromise<T> = Promise<T | null>;
