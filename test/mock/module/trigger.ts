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

    const mockTriggerModule = MiphaModule.fromScratch('mock.trigger');
    mockTriggerModule.provide('trigger', () => {
        result.payload = !result.payload;
    });

    result.module = mockTriggerModule;

    return result;
};

export const createMockDefaultTriggerModule = (): MockModule<boolean> => {

    const result: Writeable<MockModule<boolean>> = {
        module: null as any,
        payload: false,
    };

    const mockTriggerModule = MiphaModule.fromScratch('mock.trigger');
    mockTriggerModule.provideDefault(() => {
        result.payload = !result.payload;
    });

    result.module = mockTriggerModule;

    return result;
};
