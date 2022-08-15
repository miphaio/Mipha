/**
 * @author WMXPY
 * @namespace Executer
 * @description Mounted Executer
 * @override Unit Test
 */

import { END_SIGNAL, MarkedResult } from "@sudoo/marked";
import { expect } from "chai";
import * as Chance from "chance";
import { MiphaMountedExecuter, MiphaRecipe, MiphaRecipeLoadEmptySymbol, MiphaRecipeLoader, MiphaScript } from "../../../src";
import { createMockTriggerModule } from "../../mock/module/trigger";

describe('Given {MiphaMountedExecuter} Class', (): void => {

    const chance: Chance.Chance = new Chance('executer-mounted-executer');

    it('should be able to construct', async (): Promise<void> => {

        const mountedExecuter = MiphaMountedExecuter.fromScratch();

        expect(mountedExecuter).to.be.instanceOf(MiphaMountedExecuter);
    });

    it('should be able to execute module import script', async (): Promise<void> => {

        const triggerModule = createMockTriggerModule();
        const triggerScript: MiphaScript = MiphaScript.fromCode(
            'import {trigger} from "mock.trigger"; trigger();',
        );

        const mountedExecuter = MiphaMountedExecuter.fromModules(
            triggerModule.module,
        );

        await mountedExecuter.execute(triggerScript);

        expect(triggerModule.payload).to.be.true;
    });

    it('should be able to execute module import script - not found', async (): Promise<void> => {

        const mountedExecuter = MiphaMountedExecuter.fromScratch();
        const triggerScript: MiphaScript = MiphaScript.fromCode(
            'import {trigger} from "mock.trigger"; trigger();',
        );

        const result: MarkedResult = await mountedExecuter.execute(
            triggerScript,
        );

        expect(result.signal).to.be.equal(END_SIGNAL.FAILED);
    });

    it('should be able to execute dynamic import script', async (): Promise<void> => {

        const numberValue: number = chance.natural();
        const numberValueRecipe: MiphaRecipe = MiphaRecipe.fromCode(
            `export const number = ${numberValue};`,
        );

        const recipeLoader: MiphaRecipeLoader = MiphaRecipeLoader.fromLoadMethod(chance.string(), (_identifier: string) => {

            return numberValueRecipe;
        });

        const dynamicNumberScript: MiphaScript = MiphaScript.fromCode(
            'import {number} from "dynamic.number"; export default number;',
        );

        const mountedExecuter = MiphaMountedExecuter.fromRecipeLoaders(recipeLoader);

        const result: MarkedResult = await mountedExecuter.execute(
            dynamicNumberScript
        );

        if (result.signal !== END_SIGNAL.SUCCEED) {
            throw new Error('Execution failed');
        }

        expect(result.exports.default).to.be.equal(numberValue);
    });

    it('should be able to execute dynamic import script - module not found', async (): Promise<void> => {

        const numberValue: number = chance.natural();
        const numberValueRecipe: MiphaRecipe = MiphaRecipe.fromCode(
            `export const number = ${numberValue};`,
        );

        const recipeLoader: MiphaRecipeLoader = MiphaRecipeLoader.fromLoadMethod(
            chance.string(),
            (identifier: string) => {

                if (identifier !== chance.string()) {
                    return MiphaRecipeLoadEmptySymbol;
                }

                return numberValueRecipe;
            },
        );

        const mountedExecuter = MiphaMountedExecuter.fromRecipeLoaders(recipeLoader);

        const dynamicNumberScript: MiphaScript = MiphaScript.fromCode(
            'import {number} from "dynamic.number"; export default number;',
        );

        const result: MarkedResult = await mountedExecuter.execute(
            dynamicNumberScript,
        );

        expect(result.signal).to.be.equal(END_SIGNAL.FAILED);
    });

    it('should be able to execute dynamic import script - module not declared', async (): Promise<void> => {

        const mountedExecuter = MiphaMountedExecuter.fromScratch();

        const dynamicNumberScript: MiphaScript = MiphaScript.fromCode(
            'import {number} from "dynamic.number"; export default number;',
        );

        const result: MarkedResult = await mountedExecuter.execute(
            dynamicNumberScript,
        );

        expect(result.signal).to.be.equal(END_SIGNAL.FAILED);
    });

    it('should be able to execute basic script', async (): Promise<void> => {

        const numberValue: number = chance.natural();

        const mountedExecuter = MiphaMountedExecuter.fromScratch();

        const exportNumberValueScript: MiphaScript = MiphaScript.fromCode(
            `export default ${numberValue};`,
        );

        const result: MarkedResult = await mountedExecuter.execute(
            exportNumberValueScript,
        );

        if (result.signal !== END_SIGNAL.SUCCEED) {
            throw new Error('Execution failed');
        }

        expect(result.exports.default).to.be.equal(numberValue);
    });
});
