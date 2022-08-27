/**
 * @author WMXPY
 * @namespace Market
 * @description Recipe
 * @override Setup
 */

import { MiphaRecipeConfig, MiphaRecipeMetadataConfig } from "../../../../src/recipe/declare";

export const defaultFruitRecipeCode = [
    'import { createFruit } from "integration.market.fruit";',
    `export const createSadFruit = (name) => createFruit("sad-" + name);`,
    `export const createSadApple = () => createSadFruit("apple");`,
].join('\n');

export const defaultFruitRecipeMetadataConfig: MiphaRecipeMetadataConfig = {

    identifier: 'integration-recipe.market.fruit',
    requiredPermissions: [],
};

export const defaultFruitRecipeConfig: MiphaRecipeConfig = {

    metadata: defaultFruitRecipeMetadataConfig,
    recipeCode: defaultFruitRecipeCode,
};
