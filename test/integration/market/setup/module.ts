/**
 * @author WMXPY
 * @namespace Market
 * @description Module
 * @override Setup
 */

import { MiphaExecuterAdditionalArgument, MiphaModule } from "../../../../src";

export const marketFruitModule = MiphaModule.fromScratch('integration.market.fruit');
marketFruitModule.provide('createPeach', (_arg: MiphaExecuterAdditionalArgument) => {

    return {
        fruit: "peach",
    };
});
marketFruitModule.provide('createFruit', (_arg: MiphaExecuterAdditionalArgument, fruit: string) => {

    return {
        fruit,
    };
});
