/**
 * @author WMXPY
 * @namespace Recipe
 * @description Loader
 */

// Public
export type MiphaRecipeLoadMethod = (identifier: string) => string | Promise<string>;

// Public
export class MiphaRecipeLoader {

    public static fromLoadMethod(recipeLoadMethod: MiphaRecipeLoadMethod): MiphaRecipeLoader {

        return new MiphaRecipeLoader(recipeLoadMethod);
    }

    private readonly _method: MiphaRecipeLoadMethod;

    private constructor(recipeLoadMethod: MiphaRecipeLoadMethod) {

        this._method = recipeLoadMethod;
    }

    public async load(identifier: string): Promise<string> {

        return await Promise.resolve(this._method(identifier));
    }
}
