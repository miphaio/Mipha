/**
 * @author WMXPY
 * @namespace Script_Module
 * @description Module
 */

import { MiphaModuleBase } from "../base";
import { IMiphaModule } from "../interface";

// Public
export class MiphaMixinModule extends MiphaModuleBase implements IMiphaModule {

    public static fromScratch(identifier: string): MiphaMixinModule {

        return new MiphaMixinModule(identifier);
    }

    private constructor(identifier: string) {

        super(identifier);
    }
}
