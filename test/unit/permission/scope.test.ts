/**
 * @author WMXPY
 * @namespace Permission
 * @description Scope
 * @override Unit Test
 */

import { expect } from "chai";
import * as Chance from "chance";
import { MiphaPermissionScope, MiphaPermissionScopeConfig } from "../../../src";

describe('Given {MiphaPermissionScope} Class', (): void => {

    const chance: Chance.Chance = new Chance('permission-scope');

    it('should be able to construct from config', async (): Promise<void> => {

        const config: MiphaPermissionScopeConfig = {

            scope: chance.word(),
            resources: [chance.word(), chance.word()],
        };

        const scope: MiphaPermissionScope = MiphaPermissionScope.fromConfig(config);

        expect(scope).to.be.instanceOf(MiphaPermissionScope);
    });
});
