/**
 * @author WMXPY
 * @namespace AddOn_Module
 * @description Module
 */

import { MiphaModuleBase } from "../base";
import { IMiphaModule } from "../interface";

// Public
export class MiphaAddOnModule extends MiphaModuleBase implements IMiphaModule {

    public static fromScratch(identifier: string): MiphaAddOnModule {

        return new MiphaAddOnModule(identifier);
    }

    private constructor(identifier: string) {

        super(identifier);
    }
}
