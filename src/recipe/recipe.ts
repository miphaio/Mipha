/**
 * @author WMXPY
 * @namespace Recipe
 * @description Recipe
 */

// Public
export class MiphaRecipe {

    public static fromScratch(): MiphaRecipe {

        return this.fromCode('');
    }

    public static fromCode(recipeCode: string): MiphaRecipe {

        return new MiphaRecipe(recipeCode);
    }

    private _recipeCode: string;

    private constructor(recipeCode: string) {

        this._recipeCode = recipeCode;
    }

    public get recipeCode(): string {
        return this._recipeCode;
    }
}
