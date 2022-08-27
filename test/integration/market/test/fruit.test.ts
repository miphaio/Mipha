/**
 * @author WMXPY
 * @namespace Market
 * @description Fruit
 * @override Integration Test
 */

import { MarkedResult } from "@sudoo/marked";
import { expect } from "chai";
import * as Chance from "chance";
import { MiphaPermission, MiphaScript, MiphaScriptMetadata } from "../../../../src";
import { assertSucceedMarkedResult } from "../../../util/assert-result";
import { marketMiphaCore } from "../setup/core";

describe('Given (Fruit) cases for (Market) Integration test setup', (): void => {

    const chance: Chance.Chance = new Chance('integration-market-fruit');

    it('should be able to do internal method call', async (): Promise<void> => {

        const script: MiphaScript = MiphaScript.fromCode(
            MiphaScriptMetadata.fromScratch(),
            [
                'import { createPeach } from "integration.market.fruit";',
                'export default createPeach();',
            ].join('\n'),
        );

        const result: MarkedResult = await marketMiphaCore.mountAndExecuteForScriptByPermissions(
            script,
            [
                MiphaPermission.fromIdentifier('integration.market.fruit', []),
            ],
        );

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.deep.equal({
            fruit: 'peach',
        });
    });

    it('should be able to do internal method call with args', async (): Promise<void> => {

        const fruitName: string = chance.word();
        const script: MiphaScript = MiphaScript.fromCode(
            MiphaScriptMetadata.fromScratch(),
            [
                'import { createFruit } from "integration.market.fruit";',
                `export default createFruit("${fruitName}");`,
            ].join('\n'),
        );

        const result: MarkedResult = await marketMiphaCore.mountAndExecuteForScriptByPermissions(
            script,
            [
                MiphaPermission.fromIdentifier('integration.market.fruit', []),
            ],
        );

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.deep.equal({
            fruit: fruitName,
        });
    });
});
