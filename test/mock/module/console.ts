/**
 * @author WMXPY
 * @namespace Module
 * @description Console
 * @override Mock
 */

import { MiphaModule } from "../../../src";

export const mockConsoleModule = MiphaModule.fromScratch('mock.console');
mockConsoleModule.provide('print', (...args: any[]) => {
    console.log(...args);
});
