/**
 * @author WMXPY
 * @namespace Module
 * @description Interface
 */

export interface IMiphaModule {

    readonly identifier: string;
    readonly provides: Map<string, any>;

    provide<T>(symbol: string, object: T): this;
}
