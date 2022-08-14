/**
 * @author WMXPY
 * @namespace Executer
 * @description Mounted Executer
 * @override Unit Test
 */

import { END_SIGNAL, MarkedResult } from "@sudoo/marked";
import { expect } from "chai";
import * as Chance from "chance";
import { MiphaMountedExecuter, MiphaRecipeLoader } from "../../../src";
import { createMockTriggerModule } from "../../mock/module/trigger";

describe('Given {MiphaMountedExecuter} Class', (): void => {

    const chance: Chance.Chance = new Chance('executer-mounted-executer');

    it('should be able to construct', async (): Promise<void> => {

        const mountedExecuter = MiphaMountedExecuter.fromScratch();

        expect(mountedExecuter).to.be.instanceOf(MiphaMountedExecuter);
    });

    it('should be able to execute module import script', async (): Promise<void> => {

        const triggerModule = createMockTriggerModule();

        const mountedExecuter = MiphaMountedExecuter.fromModules(
            triggerModule.module,
        );

        await mountedExecuter.execute(
            'import {trigger} from "mock.trigger"; trigger();',
        );

        expect(triggerModule.payload).to.be.true;
    });

    it('should be able to execute module import script - not found', async (): Promise<void> => {

        const mountedExecuter = MiphaMountedExecuter.fromScratch();

        const result: MarkedResult = await mountedExecuter.execute(
            'import {trigger} from "mock.trigger"; trigger();',
        );

        expect(result.signal).to.be.equal(END_SIGNAL.FAILED);
    });

    it('should be able to execute dynamic import script', async (): Promise<void> => {

        const numberValue: number = chance.natural();

        const recipeLoader: MiphaRecipeLoader = MiphaRecipeLoader.fromLoadMethod(chance.string(), (_identifier: string) => {

            return `export const number = ${numberValue};`;
        });

        const mountedExecuter = MiphaMountedExecuter.fromRecipeLoaders(recipeLoader);

        const result: MarkedResult = await mountedExecuter.execute(
            'import {number} from "dynamic.number"; export default number;',
        );

        if (result.signal !== END_SIGNAL.SUCCEED) {
            throw new Error('Execution failed');
        }

        expect(result.exports.default).to.be.equal(numberValue);
    });

    it('should be able to execute dynamic import script - module not found', async (): Promise<void> => {

        const numberValue: number = chance.natural();

        const recipeLoader: MiphaRecipeLoader = MiphaRecipeLoader.fromLoadMethod(chance.string(), (identifier: string) => {

            if (identifier !== chance.string()) {
                return null;
            }

            return `export const number = ${numberValue};`;
        });

        const mountedExecuter = MiphaMountedExecuter.fromRecipeLoaders(recipeLoader);

        const result: MarkedResult = await mountedExecuter.execute(
            'import {number} from "dynamic.number"; export default number;',
        );

        expect(result.signal).to.be.equal(END_SIGNAL.FAILED);
    });

    it('should be able to execute dynamic import script - module not declared', async (): Promise<void> => {

        const mountedExecuter = MiphaMountedExecuter.fromScratch();

        const result: MarkedResult = await mountedExecuter.execute(
            'import {number} from "dynamic.number"; export default number;',
        );

        expect(result.signal).to.be.equal(END_SIGNAL.FAILED);
    });

    it('should be able to execute basic script', async (): Promise<void> => {

        const numberValue: number = chance.natural();

        const mountedExecuter = MiphaMountedExecuter.fromScratch();

        const result: MarkedResult = await mountedExecuter.execute(
            `export default ${numberValue};`,
        );

        if (result.signal !== END_SIGNAL.SUCCEED) {
            throw new Error('Execution failed');
        }

        expect(result.exports.default).to.be.equal(numberValue);
    });
});
