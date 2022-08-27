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

    it('should be able to combine single scope and multiple resource', async (): Promise<void> => {

        const firstScope: MiphaPermissionScope = MiphaPermissionScope.fromScopeAndResources(
            'first',
            ['first-resource-1', 'first-resource-2'],
        );
        const secondScope: MiphaPermissionScope = MiphaPermissionScope.fromScopeAndResources(
            'first',
            ['second-resource-1', 'second-resource-2'],
        );

        const combined: MiphaPermissionScope[] = combineScopes([
            firstScope,
            secondScope,
        ]);
        expect(combined.map((scope) => scope.toConfig())).to.be.deep.equal([
            {
                scope: 'first',
                resources: [
                    'first-resource-1',
                    'first-resource-2',
                    'second-resource-1',
                    'second-resource-2',
                ],
            },
        ]);
    });

    it('should be able to combine single scope and multiple resource with wildcard first in', async (): Promise<void> => {

        const firstScope: MiphaPermissionScope = MiphaPermissionScope.fromScopeAndResources(
            'first',
            ['*-resource-1', 'first-resource-2'],
        );
        const secondScope: MiphaPermissionScope = MiphaPermissionScope.fromScopeAndResources(
            'first',
            ['second-resource-1', 'second-resource-2'],
        );

        const combined: MiphaPermissionScope[] = combineScopes([
            firstScope,
            secondScope,
        ]);
        expect(combined.map((scope) => scope.toConfig())).to.be.deep.equal([
            {
                scope: 'first',
                resources: [
                    '*-resource-1',
                    'first-resource-2',
                    'second-resource-2',
                ],
            },
        ]);
    });

    it('should be able to combine single scope and multiple resource with wildcard last in', async (): Promise<void> => {

        const firstScope: MiphaPermissionScope = MiphaPermissionScope.fromScopeAndResources(
            'first',
            ['first-resource-1', 'first-resource-2'],
        );
        const secondScope: MiphaPermissionScope = MiphaPermissionScope.fromScopeAndResources(
            'first',
            ['*-resource-1', 'second-resource-2'],
        );

        const combined: MiphaPermissionScope[] = combineScopes([
            firstScope,
            secondScope,
        ]);
        expect(combined.map((scope) => scope.toConfig())).to.be.deep.equal([
            {
                scope: 'first',
                resources: [
                    '*-resource-1',
                    'first-resource-2',
                    'second-resource-2',
                ],
            },
        ]);
    });

    it('should be able to combine multiple scope and multiple resource', async (): Promise<void> => {

        const firstScope: MiphaPermissionScope = MiphaPermissionScope.fromScopeAndResources(
            'first',
            ['first-resource-1', 'first-resource-2'],
        );
        const secondScope: MiphaPermissionScope = MiphaPermissionScope.fromScopeAndResources(
            'second',
            ['second-resource-1', 'second-resource-2'],
        );

        const combined: MiphaPermissionScope[] = combineScopes([
            firstScope,
            secondScope,
        ]);
        expect(combined.map((scope) => scope.toConfig())).to.be.deep.equal([
            {
                scope: 'first',
                resources: [
                    'first-resource-1',
                    'first-resource-2',
                ],
            },
            {
                scope: 'second',
                resources: [
                    'second-resource-1',
                    'second-resource-2',
                ],
            },
        ]);
    });

    it('should be able to combine multiple scope and multiple resource with wildcard', async (): Promise<void> => {

        const firstScope: MiphaPermissionScope = MiphaPermissionScope.fromScopeAndResources(
            'first',
            ['*-resource-1', 'first-resource-1'],
        );
        const secondScope: MiphaPermissionScope = MiphaPermissionScope.fromScopeAndResources(
            'second',
            ['second-resource-1', '*-resource-1'],
        );

        const combined: MiphaPermissionScope[] = combineScopes([
            firstScope,
            secondScope,
        ]);
        expect(combined.map((scope) => scope.toConfig())).to.be.deep.equal([
            {
                scope: 'first',
                resources: [
                    '*-resource-1',
                ],
            },
            {
                scope: 'second',
                resources: [
                    '*-resource-1',
                ],
            },
        ]);
    });
});
