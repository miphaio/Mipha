/**
 * @author WMXPY
 * @namespace Market
 * @description Sad Fruit
 * @override Integration Test
 */

import { END_SIGNAL, MarkedResult } from "@sudoo/marked";
import { expect } from "chai";
import * as Chance from "chance";
import { MiphaPermission, MiphaScript, MiphaScriptMetadata } from "../../../../src";
import { assertSucceedMarkedResult } from "../../../util/assert-result";
import { marketMiphaCore } from "../setup/core";

describe('Given (Sad Fruit) cases for (Market) Integration test setup', (): void => {

    const chance: Chance.Chance = new Chance('integration-market-sad-fruit');

    it('should be able to do internal method call - sad path no recipe permission', async (): Promise<void> => {

        const script: MiphaScript = MiphaScript.fromCode(
            MiphaScriptMetadata.fromScratch(),
            [
                'import { createSadApple } from "integration-recipe.market.fruit";',
                'export default createSadApple();',
            ].join('\n'),
        );

        const result: MarkedResult = await marketMiphaCore.mountAndExecuteForScriptByPermissions(
            script,
            [
                MiphaPermission.fromIdentifier('integration.market.fruit', []),
            ],
        );

        expect(result.signal).to.be.equal(END_SIGNAL.FAILED);
    });

    it('should be able to do internal method call - sad path no module permission', async (): Promise<void> => {

        const script: MiphaScript = MiphaScript.fromCode(
            MiphaScriptMetadata.fromScratch(),
            [
                'import { createSadApple } from "integration-recipe.market.fruit";',
                'export default createSadApple();',
            ].join('\n'),
        );

        const result: MarkedResult = await marketMiphaCore.mountAndExecuteForScriptByPermissions(
            script,
            [
                MiphaPermission.fromIdentifier('integration-recipe.market.fruit', []),
            ],
        );

        expect(result.signal).to.be.equal(END_SIGNAL.EXCEPTION);
    });

    it('should be able to do internal method call - happy path create sad apple', async (): Promise<void> => {

        const script: MiphaScript = MiphaScript.fromCode(
            MiphaScriptMetadata.fromScratch(),
            [
                'import { createSadApple } from "integration-recipe.market.fruit";',
                'export default createSadApple();',
            ].join('\n'),
        );

        const result: MarkedResult = await marketMiphaCore.mountAndExecuteForScriptByPermissions(
            script,
            [
                MiphaPermission.fromIdentifier('integration-recipe.market.fruit', []),
                MiphaPermission.fromIdentifier('integration.market.fruit', []),
            ],
        );

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.deep.equal({
            fruit: 'sad-apple',
        });
    });

    it('should be able to do internal method call - happy path create named sad fruit', async (): Promise<void> => {

        const fruitName: string = chance.word();
        const script: MiphaScript = MiphaScript.fromCode(
            MiphaScriptMetadata.fromScratch(),
            [
                'import { createSadFruit } from "integration-recipe.market.fruit";',
                `export default createSadFruit("${fruitName}");`,
            ].join('\n'),
        );

        const result: MarkedResult = await marketMiphaCore.mountAndExecuteForScriptByPermissions(
            script,
            [
                MiphaPermission.fromIdentifier('integration-recipe.market.fruit', []),
                MiphaPermission.fromIdentifier('integration.market.fruit', []),
            ],
        );

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.deep.equal({
            fruit: `sad-${fruitName}`,
        });
    });
});
