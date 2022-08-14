/**
 * @author WMXPY
 * @namespace Module
 * @description Console
 * @override Mock
 */

import { MiphaModule } from "../../../src";
import { MockModule } from "./declare";

export const createMockConsoleModule = (): MockModule => {

    const mockConsoleModule = MiphaModule.fromScratch('mock.console');
    mockConsoleModule.provide('print', (...args: any[]) => {
        console.log(...args);
    });

    return {
        module: mockConsoleModule,
        payload: undefined,
    };
};
