/**
 * @author WMXPY
 * @namespace Script
 * @description Script
 */

import { MiphaScriptConfig } from "./declare";
import { MiphaScriptMetadata } from "./metadata";

// Public
export class MiphaScript {

    public static fromConfig(config: MiphaScriptConfig): MiphaScript {

        return this.fromCode(
            MiphaScriptMetadata.fromConfig(config.metadata),
            config.scriptCode,
        );
    }

    public static fromCode(
        metadata: MiphaScriptMetadata,
        scriptCode: string,
    ): MiphaScript {

        return new MiphaScript(metadata, scriptCode);
    }

    private readonly _metadata: MiphaScriptMetadata;
    private readonly _scriptCode: string;

    private constructor(
        metadata: MiphaScriptMetadata,
        scriptCode: string,
    ) {

        this._metadata = metadata;
        this._scriptCode = scriptCode;
    }

    public get metadata(): MiphaScriptMetadata {
        return this._metadata;
    }
    public get scriptCode(): string {
        return this._scriptCode;
    }

    public toConfig(): MiphaScriptConfig {

        return {
            metadata: this._metadata.toConfig(),
            scriptCode: this._scriptCode,
        };
    }
}
