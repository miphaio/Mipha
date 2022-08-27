/**
 * @author WMXPY
 * @namespace Permission_Combine
 * @description Combine Scopes
 * @override Unit Test
 */

import { expect } from "chai";
import * as Chance from "chance";
import { MiphaPermissionScope } from "../../../../src";
import { combineScopes } from "../../../../src/permission/combine/combine-scopes";

describe('Given [CombineScopes] Helper Methods', (): void => {

    const chance: Chance.Chance = new Chance('permission-combine-scopes');

    it('should be able to combine single scope and single resource', async (): Promise<void> => {

        const scope: MiphaPermissionScope = MiphaPermissionScope.fromScopeAndResources(
            chance.word(),
            [chance.word()],
        );

        const combined: MiphaPermissionScope[] = combineScopes([scope]);
        expect(combined).to.be.lengthOf(1);
    });
});
