/**
 * @author WMXPY
 * @namespace Permission_Combine
 * @description Combine Permissions
 * @override Unit Test
 */

import { expect } from "chai";
import * as Chance from "chance";
import { MiphaPermission, MiphaPermissionScope } from "../../../../src";
import { combinePermissions } from "../../../../src/permission/combine/combine-permissions";

describe('Given [CombinePermissions] Helper Methods', (): void => {

    const chance: Chance.Chance = new Chance('permission-combine-permissions');

    it('should be able to combine single permission', async (): Promise<void> => {

        const permission: MiphaPermission = MiphaPermission.fromIdentifier(
            chance.word(),
            [
                MiphaPermissionScope.fromScopeAndResources(chance.word(), []),
            ],
        );

        const combined: MiphaPermission[] = combinePermissions([permission]);
        expect(combined).to.be.lengthOf(1);
    });
});
