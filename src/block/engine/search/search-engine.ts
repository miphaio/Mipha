/**
 * @author WMXPY
 * @namespace Block_Engine_Search
 * @description Search Engine
 */

import { UUIDVersion1 } from "@sudoo/uuid";

export abstract class MiphaSearchEngine {

    private readonly _searchEngineIdentifier: string;

    protected constructor() {

        this._searchEngineIdentifier = UUIDVersion1.generate().toString();
    }

    public get searchEngineIdentifier(): string {
        return this._searchEngineIdentifier;
    }
}
