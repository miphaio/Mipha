/**
 * @author WMXPY
 * @namespace Executer
 * @description Executer
 * @override Unit Test
 */

import { END_SIGNAL, MarkedResult } from "@sudoo/marked";
import { expect } from "chai";
import * as Chance from "chance";
import { MiphaExecuter, MiphaPermission, MiphaPermissionScope, MiphaRecipe, MiphaScript } from "../../../src";
import { MockModule } from "../../mock/module/declare";
import { createMockStaticValueInvalidScopedModule, createMockStaticValueModule, createMockStaticValueScopedModule } from "../../mock/module/static-value";
import { createMockDefaultTriggerModule } from "../../mock/module/trigger";

describe('Given {MiphaExecuter} Class', (): void => {

    const chance: Chance.Chance = new Chance('executer-executer');

    it('should be able to construct', async (): Promise<void> => {

        const executer: MiphaExecuter = MiphaExecuter.fromScratch();

        expect(executer).to.be.instanceOf(MiphaExecuter);
    });

    it('should be able to execute pure script', async (): Promise<void> => {

        const scriptValue: number = chance.integer();
        const simpleScript: MiphaScript = MiphaScript.fromCode(
            `export default ${scriptValue};`,
        );

        const executer: MiphaExecuter = MiphaExecuter.fromScratch();
        const result: MarkedResult = await executer.mountAndExecute(simpleScript, []);

        expect(result).to.be.deep.equal({
            exports: {
                default: scriptValue,
                named: {},
            },
            signal: END_SIGNAL.SUCCEED,
        });
    });

    it('should be able to execute module mounted script', async (): Promise<void> => {

        const triggerModule = createMockDefaultTriggerModule();
        const triggerScript: MiphaScript = MiphaScript.fromCode(
            'import trigger from "mock.trigger"; trigger();',
        );

        const executer: MiphaExecuter = MiphaExecuter.fromModules(
            [triggerModule.module],
        );
        const result: MarkedResult = await executer.mountAndExecute(triggerScript, [
            MiphaPermission.fromIdentifier('mock.trigger', []),
        ]);

        expect(result.signal).to.be.equal(END_SIGNAL.SUCCEED);
        expect(triggerModule.payload).to.be.true;
    });

    it('should be able to execute module mounted script - sad path no permission', async (): Promise<void> => {

        const triggerModule = createMockDefaultTriggerModule();
        const triggerScript: MiphaScript = MiphaScript.fromCode(
            'import trigger from "mock.trigger"; trigger();',
        );

        const executer: MiphaExecuter = MiphaExecuter.fromModules(
            [triggerModule.module],
        );
        const result: MarkedResult = await executer.mountAndExecute(triggerScript, []);

        expect(result.signal).to.be.equal(END_SIGNAL.FAILED);
    });

    it('should be able to execute module mounted script with scoped permission', async (): Promise<void> => {

        const staticValueModule = createMockStaticValueScopedModule();
        const getTenScript: MiphaScript = MiphaScript.fromCode(
            'import {getTen} from "mock.static-value"; export default getTen();',
        );

        const executer: MiphaExecuter = MiphaExecuter.fromModules(
            [staticValueModule.module],
        );
        const result: MarkedResult = await executer.mountAndExecute(getTenScript, [
            MiphaPermission.fromIdentifier('mock.static-value', [
                MiphaPermissionScope.fromScopeAndResource('value', '10'),
            ]),
        ]);

        if (result.signal !== END_SIGNAL.SUCCEED) {
            throw new Error('Execution failed');
        }

        expect(result.exports.default).to.be.equal(10);
    });

    it('should be able to execute module mounted script with scoped permission with wildcard', async (): Promise<void> => {

        const staticValueModule = createMockStaticValueScopedModule();
        const getTenScript: MiphaScript = MiphaScript.fromCode(
            'import {getTen} from "mock.static-value"; export default getTen();',
        );

        const executer: MiphaExecuter = MiphaExecuter.fromModules(
            [staticValueModule.module],
        );
        const result: MarkedResult = await executer.mountAndExecute(getTenScript, [
            MiphaPermission.fromIdentifier('mock.static-value', [
                MiphaPermissionScope.fromScopeAndResource('v*lue', '*'),
            ]),
        ]);

        if (result.signal !== END_SIGNAL.SUCCEED) {
            throw new Error('Execution failed');
        }

        expect(result.exports.default).to.be.equal(10);
    });

    it('should be able to execute module mounted script with invalid scoped permission', async (): Promise<void> => {

        const staticValueModule = createMockStaticValueInvalidScopedModule();
        const getTenScript: MiphaScript = MiphaScript.fromCode(
            'import {getTen} from "mock.static-value"; export default getTen();',
        );

        const executer: MiphaExecuter = MiphaExecuter.fromModules(
            [staticValueModule.module],
        );
        const result: MarkedResult = await executer.mountAndExecute(getTenScript, [
            MiphaPermission.fromIdentifier('mock.static-value', [
                MiphaPermissionScope.fromScopeAndResource('v*lue', '*'),
            ]),
        ]);

        expect(result.signal).to.be.equal(END_SIGNAL.FAILED);
    });

    it('should be able to execute recipe mounted script', async (): Promise<void> => {

        const numberValue: number = chance.natural();
        const numberValueRecipe: MiphaRecipe = MiphaRecipe.fromCode(
            'dynamic.number',
            `export const number = ${numberValue};`,
        );

        const dynamicNumberScript: MiphaScript = MiphaScript.fromCode(
            'import {number} from "dynamic.number"; export default number;',
        );

        const executer: MiphaExecuter = MiphaExecuter.fromRecipes(
            [numberValueRecipe],
        );
        const result: MarkedResult = await executer.mountAndExecute(dynamicNumberScript, [
            MiphaPermission.fromIdentifier('dynamic.number', []),
        ]);

        if (result.signal !== END_SIGNAL.SUCCEED) {
            throw new Error('Execution failed');
        }

        expect(result.exports.default).to.be.equal(numberValue);
    });

    it('should be able to execute module and recipe mounted script', async (): Promise<void> => {

        const staticValueModule: MockModule = createMockStaticValueModule();

        const numberValueRecipe: MiphaRecipe = MiphaRecipe.fromCode(
            'dynamic.number',
            `import {getTen} from "mock.static-value"; export const number = getTen();`,
        );

        const dynamicNumberScript: MiphaScript = MiphaScript.fromCode(
            'import {number} from "dynamic.number"; export default number;',
        );

        const executer: MiphaExecuter = MiphaExecuter.fromModulesAndRecipes(
            [staticValueModule.module],
            [numberValueRecipe],
        );
        const result: MarkedResult = await executer.mountAndExecute(dynamicNumberScript, [
            MiphaPermission.fromIdentifier('mock.static-value', []),
            MiphaPermission.fromIdentifier('dynamic.number', []),
        ]);

        if (result.signal !== END_SIGNAL.SUCCEED) {
            throw new Error('Execution failed');
        }

        expect(result.exports.default).to.be.equal(10);
    });
});
