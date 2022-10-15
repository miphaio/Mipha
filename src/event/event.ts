/**
 * @author WMXPY
 * @namespace Event
 * @description Event
 */

import { UUIDVersion4 } from "@sudoo/uuid";

export class MiphaEvent {

    public static fromScratch(): MiphaEvent {

        const identifier: string = UUIDVersion4.generateString();

        return new MiphaEvent(identifier);
    }

    private readonly _identifier: string;

    private constructor(identifier: string) {

        this._identifier = identifier;
    }

    public get identifier(): string {
        return this._identifier;
    }
}
