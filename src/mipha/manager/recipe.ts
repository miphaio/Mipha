/**
 * @author WMXPY
 * @namespace Mipha_Manager
 * @description Recipe
 */

import { MiphaPermission } from "../../permission/permission";
import { MiphaRecipeConfig, MiphaRecipeMetadataConfig } from "../../recipe/declare";
import { MiphaRecipeMetadata } from "../../recipe/metadata";
import { MiphaRecipe } from "../../recipe/recipe";
import { MiphaStorageProxy } from "../../storage/proxy";
import { ERROR_CODE, panic } from "../../util/error";

// Public
export class MiphaCoreRecipeManager {

    public static fromStorageProxy(
        storageProxy: MiphaStorageProxy,
    ): MiphaCoreRecipeManager {

        return new MiphaCoreRecipeManager(storageProxy);
    }

    private readonly _storageProxy: MiphaStorageProxy;

    private _cachedRecipes: Set<MiphaRecipeMetadata> | null;

    private readonly _cachedRecipeMap: Map<string, MiphaRecipe>;

    private constructor(
        storageProxy: MiphaStorageProxy,
    ) {

        this._storageProxy = storageProxy;

        this._cachedRecipes = null;

        this._cachedRecipeMap = new Map();
    }

    public async getAllRecipes(): Promise<Set<MiphaRecipeMetadata>> {

        if (this._cachedRecipes !== null) {
            return this._cachedRecipes;
        }

        const recipes: Iterable<MiphaRecipeMetadataConfig> = await this._storageProxy.getAllRecipes();
        const result: Set<MiphaRecipeMetadata> = new Set();

        for (const recipe of recipes) {
            result.add(MiphaRecipeMetadata.fromConfig(recipe));
        }
        return result;
    }

    public async putRecipes(recipes: Iterable<MiphaRecipe>): Promise<void> {

        for (const recipe of recipes) {
            this._cachedRecipeMap.set(recipe.identifier, recipe);
        }
        this._cachedRecipes = null;

        const configs: MiphaRecipeConfig[] = [];
        for (const recipe of recipes) {
            configs.push(recipe.toConfig());
        }
        return await this._storageProxy.putRecipes(configs);
    }

    public async getSingleRecipe(recipe: MiphaRecipeMetadata): Promise<MiphaRecipe | null> {

        const config: MiphaRecipeConfig | null = await this._storageProxy.getSingleRecipe(recipe.toConfig());
        if (config === null) {
            return null;
        }

        const recipeInstance: MiphaRecipe = MiphaRecipe.fromConfig(config);
        this._cachedRecipeMap.set(recipe.identifier, recipeInstance);

        return recipeInstance;
    }

    public async getNeededRecipesForPermissions(permissions: Iterable<MiphaPermission>): Promise<Iterable<MiphaRecipe>> {

        const result: Set<MiphaRecipe> = new Set();

        const recipeMetadataSet: Set<MiphaRecipeMetadata> = await this.getAllRecipes();
        const recipeIdentifierMap: Map<string, MiphaRecipeMetadata> = new Map();

        for (const recipeMetadata of recipeMetadataSet) {
            recipeIdentifierMap.set(recipeMetadata.identifier, recipeMetadata);
        }

        for (const permission of permissions) {
            if (recipeIdentifierMap.has(permission.identifier)) {

                const recipeInstance: MiphaRecipe | null = await this.getSingleRecipe(
                    recipeIdentifierMap.get(permission.identifier) as MiphaRecipeMetadata,
                );

                if (recipeInstance === null) {
                    throw panic.code(ERROR_CODE.RECIPE_NOT_FOUND_1, permission.identifier);
                }

                result.add(recipeInstance);
            }
        }
        return result;
    }
}
