/**
 * @author WMXPY
 * @namespace Recipe
 * @description Recipe
 */

// Public
export class MiphaRecipe {

    public static fromScratch(identifier: string): MiphaRecipe {

        return this.fromCode(identifier, '');
    }

    public static fromCode(identifier: string, recipeCode: string): MiphaRecipe {

        return new MiphaRecipe(identifier, recipeCode);
    }

    private readonly _recipeIdentifier: string;

    private _recipeCode: string;

    private constructor(identifier: string, recipeCode: string) {

        this._recipeIdentifier = identifier;

        this._recipeCode = recipeCode;
    }

    public get identifier(): string {
        return this._recipeIdentifier;
    }

    public get recipeCode(): string {
        return this._recipeCode;
    }
}
