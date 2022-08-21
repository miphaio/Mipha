/**
 * @author WMXPY
 * @namespace Module
 * @description Static Value
 * @override Mock
 */

import { MiphaExecuterAdditionalArgument, MiphaModule } from "../../../src";
import { Writeable } from "../../../src/util/writeable";
import { MockModule } from "./declare";

export const createMockStaticValueModule = (): MockModule => {

    const mockStaticValueModule = MiphaModule.fromScratch('mock.static-value');
    mockStaticValueModule.provide('getTen', () => {
        return 10;
    });

    const result: Writeable<MockModule> = {
        module: mockStaticValueModule,
        payload: undefined,
    };

    return result;
};

export const createMockStaticValueScopedModule = (): MockModule => {

    const mockStaticValueModule = MiphaModule.fromScratch('mock.static-value');
    mockStaticValueModule.provide('getTen', (additionalArguments: MiphaExecuterAdditionalArgument) => {

        additionalArguments.permissionController.assert(
            'mock.static-value',
            'value',
            '10',
        );
        return 10;
    });

    const result: Writeable<MockModule> = {
        module: mockStaticValueModule,
        payload: undefined,
    };

    return result;
};

export const createMockStaticValueInvalidScopedModule = (): MockModule => {

    const mockStaticValueModule = MiphaModule.fromScratch('mock.static-value');
    mockStaticValueModule.provide('getTen', (additionalArguments: MiphaExecuterAdditionalArgument) => {

        additionalArguments.permissionController.assert(
            'mock.static-value',
            '*',
            '*',
        );
        return 10;
    });

    const result: Writeable<MockModule> = {
        module: mockStaticValueModule,
        payload: undefined,
    };

    return result;
};
