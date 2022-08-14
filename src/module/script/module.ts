/**
 * @author WMXPY
 * @namespace Script_Module
 * @description Module
 */

import { MiphaModuleBase } from "../base";
import { IMiphaModule } from "../interface";

// Public
export class MiphaScriptModule extends MiphaModuleBase implements IMiphaModule {

    public static fromScratch(identifier: string): MiphaScriptModule {

        return new MiphaScriptModule(identifier);
    }

    private constructor(identifier: string) {

        super(identifier);
    }
}
