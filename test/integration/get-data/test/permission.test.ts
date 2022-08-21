/**
 * @author WMXPY
 * @namespace GetData
 * @description Permission
 * @override Integration
 */

import { MarkedResult } from "@sudoo/marked";
import { expect } from "chai";
import * as Chance from "chance";
import { MiphaScript } from "../../../../src";
import { assertSucceedMarkedResult } from "../../../util/assert-result";
import { getDataIntegrationExecuter } from "../setup/get-data";

describe('Given (Permission) cases for (GetData) Integration test setup', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance: Chance.Chance = new Chance('integration-get-data-permission');

    it('should be able to execute module with permission', async (): Promise<void> => {

        const script: MiphaScript = MiphaScript.fromCode(
            `import {first} from "integration.get-data.first";export default first()`
        );

        const result: MarkedResult = await getDataIntegrationExecuter.mountAndExecute(
            script,
            [],
        );

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.equal('first');
    });
});
