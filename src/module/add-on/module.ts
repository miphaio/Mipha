/**
 * @author WMXPY
 * @namespace AddOn_Module
 * @description Module
 */

import { IMiphaModule } from "../interface";

// Public
export class MiphaAddOnModule implements IMiphaModule {

    public readonly identifier: string;

    public constructor(identifier: string) {

        this.identifier = identifier;
    }
}
