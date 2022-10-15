/**
 * @author WMXPY
 * @namespace Task
 * @description Task
 */

import { UUIDVersion4 } from "@sudoo/uuid";

export class MiphaTask {

    public static fromScratch(): MiphaTask {

        const identifier: string = UUIDVersion4.generateString();

        return new MiphaTask(identifier);
    }

    private readonly _identifier: string;

    private constructor(identifier: string) {

        this._identifier = identifier;
    }

    public get identifier(): string {
        return this._identifier;
    }
}
