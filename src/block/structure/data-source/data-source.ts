/**
 * @author WMXPY
 * @namespace Block_Structure_DataSource
 * @description DataSource
 */

import { UUIDVersion1 } from "@sudoo/uuid";

// Public
export class MiphaDataSource {

    public static fromScratch(): MiphaDataSource {

        const identifier: string = UUIDVersion1.generate().toString();

        return new MiphaDataSource(identifier);
    }

    public static fromIdentifier(identifier: string): MiphaDataSource {

        return new MiphaDataSource(identifier);
    }

    private readonly _identifier: string;

    private constructor(identifier: string) {

        this._identifier = identifier;
    }

    public get identifier(): string {
        return this._identifier;
    }
}
