/**
 * @author WMXPY
 * @namespace Mipha_Manager
 * @description Script
 */

import { MiphaScriptConfig, MiphaScriptMetadataConfig } from "../../script/declare";
import { MiphaScriptMetadata } from "../../script/metadata";
import { MiphaScript } from "../../script/script";
import { MiphaStorageProxy } from "../../storage/proxy";

// Public
export class MiphaCoreScriptManager {

    public static fromStorageProxy(
        storageProxy: MiphaStorageProxy,
    ): MiphaCoreScriptManager {

        return new MiphaCoreScriptManager(storageProxy);
    }

    private readonly _storageProxy: MiphaStorageProxy;

    private constructor(
        storageProxy: MiphaStorageProxy,
    ) {

        this._storageProxy = storageProxy;
    }

    public async getAllScripts(): Promise<Set<MiphaScriptMetadata>> {

        const scripts: Iterable<MiphaScriptMetadataConfig> = await this._storageProxy.getAllScripts();
        const result: Set<MiphaScriptMetadata> = new Set();

        for (const script of scripts) {
            result.add(MiphaScriptMetadata.fromConfig(script));
        }
        return result;
    }

    public async putScripts(scripts: Iterable<MiphaScript>): Promise<void> {

        const configs: MiphaScriptConfig[] = [];
        for (const script of scripts) {
            configs.push(script.toConfig());
        }
        return await this._storageProxy.putScripts(configs);
    }

    public async getSingleScript(script: MiphaScriptMetadata): Promise<MiphaScript | null> {

        const config: MiphaScriptConfig | null = await this._storageProxy.getSingleScript(script.toConfig());
        if (config === null) {
            return null;
        }
        return MiphaScript.fromConfig(config);
    }
}
