/**
 * @author WMXPY
 * @namespace Executer
 * @description Mounted Executer
 * @override Unit Test
 */

import { END_SIGNAL, MarkedResult } from "@sudoo/marked";
import { expect } from "chai";
import * as Chance from "chance";
import { MiphaMountedExecuter, MiphaPermissionController, MiphaRecipe, MiphaRecipeMetadata, MiphaScript, MiphaScriptMetadata } from "../../../src";
import { createMockDefaultTriggerModule, createMockTriggerModule } from "../../mock/module/trigger";
import { assertSucceedMarkedResult } from "../../util/assert-result";

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
            MiphaScriptMetadata.fromScratch(),
            'import {trigger} from "mock.trigger"; trigger();',
        );

        const mountedExecuter = MiphaMountedExecuter.fromModules(
            triggerScript,
            MiphaPermissionController.fromScratch(),
            triggerModule.module,
        );

        await mountedExecuter.execute();

        expect(triggerModule.payload).to.be.true;
    });

    it('should be able to execute module import wildcard script', async (): Promise<void> => {

        const triggerModule = createMockTriggerModule();
        const triggerScript: MiphaScript = MiphaScript.fromCode(
            MiphaScriptMetadata.fromScratch(),
            'import * as Trigger from "mock.trigger"; Trigger.trigger();',
        );

        const mountedExecuter = MiphaMountedExecuter.fromModules(
            triggerScript,
            MiphaPermissionController.fromScratch(),
            triggerModule.module,
        );

        await mountedExecuter.execute();

        expect(triggerModule.payload).to.be.true;
    });

    it('should be able to execute module import default script', async (): Promise<void> => {

        const triggerModule = createMockDefaultTriggerModule();
        const triggerScript: MiphaScript = MiphaScript.fromCode(
            MiphaScriptMetadata.fromScratch(),
            'import trigger from "mock.trigger"; trigger();',
        );

        const mountedExecuter = MiphaMountedExecuter.fromModules(
            triggerScript,
            MiphaPermissionController.fromScratch(),
            triggerModule.module,
        );

        await mountedExecuter.execute();

        expect(triggerModule.payload).to.be.true;
    });

    it('should be able to execute module import script - not found', async (): Promise<void> => {

        const triggerScript: MiphaScript = MiphaScript.fromCode(
            MiphaScriptMetadata.fromScratch(),
            'import {trigger} from "mock.trigger"; trigger();',
        );
        const mountedExecuter = MiphaMountedExecuter.fromScratch(triggerScript);

        const result: MarkedResult = await mountedExecuter.execute();

        expect(result.signal).to.be.equal(END_SIGNAL.FAILED);
    });

    it('should be able to execute dynamic import script', async (): Promise<void> => {

        const numberValue: number = chance.natural();
        const numberValueRecipe: MiphaRecipe = MiphaRecipe.fromCode(
            MiphaRecipeMetadata.fromIdentifier('dynamic.number'),
            `export const number = ${numberValue};`,
        );

        const dynamicNumberScript: MiphaScript = MiphaScript.fromCode(
            MiphaScriptMetadata.fromScratch(),
            'import {number} from "dynamic.number"; export default number;',
        );

        const mountedExecuter = MiphaMountedExecuter.fromRecipes(
            dynamicNumberScript,
            MiphaPermissionController.fromScratch(),
            numberValueRecipe,
        );

        const result: MarkedResult = await mountedExecuter.execute();

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.equal(numberValue);
    });

    it('should be able to execute dynamic import script - module not found', async (): Promise<void> => {

        const dynamicNumberScript: MiphaScript = MiphaScript.fromCode(
            MiphaScriptMetadata.fromScratch(),
            'import {number} from "dynamic.number"; export default number;',
        );
        const mountedExecuter = MiphaMountedExecuter.fromRecipes(
            dynamicNumberScript,
            MiphaPermissionController.fromScratch(),
        );

        const result: MarkedResult = await mountedExecuter.execute();

        expect(result.signal).to.be.equal(END_SIGNAL.FAILED);
    });

    it('should be able to execute dynamic import script - module not declared', async (): Promise<void> => {

        const dynamicNumberScript: MiphaScript = MiphaScript.fromCode(
            MiphaScriptMetadata.fromScratch(),
            'import {number} from "dynamic.number"; export default number;',
        );
        const mountedExecuter = MiphaMountedExecuter.fromScratch(dynamicNumberScript);

        const result: MarkedResult = await mountedExecuter.execute();

        expect(result.signal).to.be.equal(END_SIGNAL.FAILED);
    });

    it('should be able to execute basic script', async (): Promise<void> => {

        const numberValue: number = chance.natural();

        const exportNumberValueScript: MiphaScript = MiphaScript.fromCode(
            MiphaScriptMetadata.fromScratch(),
            `export default ${numberValue};`,
        );
        const mountedExecuter = MiphaMountedExecuter.fromScratch(exportNumberValueScript);

        const result: MarkedResult = await mountedExecuter.execute();

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.equal(numberValue);
    });
});
