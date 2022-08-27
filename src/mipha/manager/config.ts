/**
 * @author WMXPY
 * @namespace Mipha_Manager
 * @description Config
 */

import { MiphaStorageConfig } from "../../storage/declare/config";
import { createMiphaDefaultStorageConfig } from "../../storage/default/config";
import { MiphaStorageProxy } from "../../storage/proxy";

// Public
export class MiphaCoreConfigManager {

    public static fromStorageProxy(
        storageProxy: MiphaStorageProxy,
    ): MiphaCoreConfigManager {

        return new MiphaCoreConfigManager(storageProxy);
    }

    private readonly _storageProxy: MiphaStorageProxy;

    private constructor(
        storageProxy: MiphaStorageProxy,
    ) {

        this._storageProxy = storageProxy;
    }

    public async readConfig(): Promise<MiphaStorageConfig> {

        const config: MiphaStorageConfig | null = await this._storageProxy.readConfig();

        if (config === null) {

            const defaultConfig: MiphaStorageConfig = createMiphaDefaultStorageConfig();
            await this.writeConfig(defaultConfig);
            return defaultConfig;
        }
        return config;
    }

    public async writeConfig(config: MiphaStorageConfig): Promise<void> {

        return await this._storageProxy.saveConfig(config);
    }
}
