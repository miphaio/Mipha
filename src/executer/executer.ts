/**
 * @author WMXPY
 * @namespace Executer
 * @description Executer
 */

import { Sandbox } from "@sudoo/marked";

// Public
export class MiphaExecuter {

    public static fromScratch(): MiphaExecuter {
        return new MiphaExecuter();
    }

    private readonly _marked: Sandbox;

    private constructor() {

        this._marked = Sandbox.create();
    }
}
