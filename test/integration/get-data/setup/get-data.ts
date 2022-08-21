/**
 * @author WMXPY
 * @namespace GetData
 * @description Get Data
 * @override Setup
 */

import { MiphaExecuter, MiphaExecuterAdditionalArgument, MiphaModule } from "../../../../src";

const getDataFirstModule = MiphaModule.fromScratch('integration.get-data.first');
getDataFirstModule.provide('first', (arg: MiphaExecuterAdditionalArgument) => {

    arg.permissionController.assert(
        'integration.get-data.first',
        'value',
        'first',
    );

    return 'first';
});

const getDataSecondModule = MiphaModule.fromScratch('integration.get-data.second');

export const getDataIntegrationExecuter = MiphaExecuter.fromModulesAndRecipes(
    [getDataFirstModule, getDataSecondModule],
    [],
);
