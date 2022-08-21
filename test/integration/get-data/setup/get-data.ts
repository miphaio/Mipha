/**
 * @author WMXPY
 * @namespace GetData
 * @description Get Data
 * @override Setup
 */

import { MiphaExecuter, MiphaModule } from "../../../../src";

const getDataFirstModule = MiphaModule.fromScratch('integration.get-data.first');
const getDataSecondModule = MiphaModule.fromScratch('integration.get-data.second');

export const getDataIntegrationExecuter = MiphaExecuter.fromModulesAndRecipes(
    [getDataFirstModule, getDataSecondModule],
    [],
);
