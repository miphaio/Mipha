/**
 * @author WMXPY
 * @namespace Script
 * @description Metadata
 */

import { MiphaScriptMetadataConfig } from "./declare";

// Public
export class MiphaScriptMetadata {

    public static fromConfig(config: MiphaScriptMetadataConfig): MiphaScriptMetadata {

        return new MiphaScriptMetadata(
            new Set(config.requirements),
        );
    }

    public static fromScratch(): MiphaScriptMetadata {

        return new MiphaScriptMetadata(new Set());
    }

    private readonly _requirements: Set<string>;

    private constructor(requirements: Set<string>) {

        this._requirements = requirements;
    }

    public get requirements(): Set<string> {
        return this._requirements;
    }

    public toConfig(): MiphaScriptMetadataConfig {

        return {
            requirements: Array.from(this._requirements),
        };
    }
}
