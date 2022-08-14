/**
 * @author WMXPY
 * @namespace Module
 * @description Trigger
 * @override Mock
 */

import { MiphaModule } from "../../../src";
import { Writeable } from "../../../src/util/writeable";
import { MockModule } from "./declare";

export const createMockTriggerModule = (): MockModule<boolean> => {

    const result: Writeable<MockModule<boolean>> = {
        module: null as any,
        payload: false,
    };

    const mockConsoleModule = MiphaModule.fromScratch('mock.trigger');
    mockConsoleModule.provide('trigger', () => {
        result.payload = !result.payload;
    });

    result.module = mockConsoleModule;

    return result;
};
