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
import { createMockDefaultTriggerModule, createMockTriggerModule } from "../../mock/module/trigger";

describe('Given {MiphaMountedExecuter} Class', (): void => {

    const chance: Chance.Chance = new Chance('executer-mounted-executer');

    it('should be able to construct', async (): Promise<void> => {

        const mountedExecuter = MiphaMountedExecuter.fromScratch(
            null as any,
        );

        expect(mountedExecuter).to.be.instanceOf(MiphaMountedExecuter);
    });

    it('should be able to execute module import script', async (): Promise<void> => {

        const triggerModule = createMockTriggerModule();
        const triggerScript: MiphaScript = MiphaScript.fromCode(
            'import {trigger} from "mock.trigger"; trigger();',
        );

        const mountedExecuter = MiphaMountedExecuter.fromModules(
            triggerScript,
            triggerModule.module,
        );

        await mountedExecuter.execute();

        expect(triggerModule.payload).to.be.true;
    });

    it('should be able to execute module import wildcard script', async (): Promise<void> => {

        const triggerModule = createMockTriggerModule();
        const triggerScript: MiphaScript = MiphaScript.fromCode(
            'import * as Trigger from "mock.trigger"; Trigger.trigger();',
        );

        const mountedExecuter = MiphaMountedExecuter.fromModules(
            triggerScript,
            triggerModule.module,
        );

        await mountedExecuter.execute();

        expect(triggerModule.payload).to.be.true;
    });

    it('should be able to execute module import default script', async (): Promise<void> => {

        const triggerModule = createMockDefaultTriggerModule();
        const triggerScript: MiphaScript = MiphaScript.fromCode(
            'import trigger from "mock.trigger"; trigger();',
        );

        const mountedExecuter = MiphaMountedExecuter.fromModules(
            triggerScript,
            triggerModule.module,
        );

        await mountedExecuter.execute();

        expect(triggerModule.payload).to.be.true;
    });

    it('should be able to execute module import script - not found', async (): Promise<void> => {

        const triggerScript: MiphaScript = MiphaScript.fromCode(
            'import {trigger} from "mock.trigger"; trigger();',
        );
        const mountedExecuter = MiphaMountedExecuter.fromScratch(triggerScript);

        const result: MarkedResult = await mountedExecuter.execute();

        expect(result.signal).to.be.equal(END_SIGNAL.FAILED);
    });

    it('should be able to execute dynamic import script', async (): Promise<void> => {

        const numberValue: number = chance.natural();
        const numberValueRecipe: MiphaRecipe = MiphaRecipe.fromCode(
            'dynamic.number',
            `export const number = ${numberValue};`,
        );

        const recipeLoader: MiphaRecipeLoader = MiphaRecipeLoader.fromRecipes(chance.string(), numberValueRecipe);

        const dynamicNumberScript: MiphaScript = MiphaScript.fromCode(
            'import {number} from "dynamic.number"; export default number;',
        );

        const mountedExecuter = MiphaMountedExecuter.fromRecipeLoaders(
            dynamicNumberScript,
            recipeLoader,
        );

        const result: MarkedResult = await mountedExecuter.execute();

        if (result.signal !== END_SIGNAL.SUCCEED) {
            throw new Error('Execution failed');
        }

        expect(result.exports.default).to.be.equal(numberValue);
    });

    it('should be able to execute dynamic import script - module not found', async (): Promise<void> => {

        const numberValue: number = chance.natural();
        const numberValueRecipe: MiphaRecipe = MiphaRecipe.fromCode(
            'dynamic.number',
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

        const dynamicNumberScript: MiphaScript = MiphaScript.fromCode(
            'import {number} from "dynamic.number"; export default number;',
        );
        const mountedExecuter = MiphaMountedExecuter.fromRecipeLoaders(
            dynamicNumberScript,
            recipeLoader,
        );

        const result: MarkedResult = await mountedExecuter.execute();

        expect(result.signal).to.be.equal(END_SIGNAL.FAILED);
    });

    it('should be able to execute dynamic import script - module not declared', async (): Promise<void> => {

        const dynamicNumberScript: MiphaScript = MiphaScript.fromCode(
            'import {number} from "dynamic.number"; export default number;',
        );
        const mountedExecuter = MiphaMountedExecuter.fromScratch(dynamicNumberScript);

        const result: MarkedResult = await mountedExecuter.execute();

        expect(result.signal).to.be.equal(END_SIGNAL.FAILED);
    });

    it('should be able to execute basic script', async (): Promise<void> => {

        const numberValue: number = chance.natural();

        const exportNumberValueScript: MiphaScript = MiphaScript.fromCode(
            `export default ${numberValue};`,
        );
        const mountedExecuter = MiphaMountedExecuter.fromScratch(exportNumberValueScript);

        const result: MarkedResult = await mountedExecuter.execute();

        if (result.signal !== END_SIGNAL.SUCCEED) {
            throw new Error('Execution failed');
        }

        expect(result.exports.default).to.be.equal(numberValue);
    });
});
