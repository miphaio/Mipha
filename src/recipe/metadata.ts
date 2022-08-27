/**
 * @author WMXPY
 * @namespace Recipe
 * @description Metadata
 */

import { MiphaPermissionConfig } from "../permission/declare";
import { MiphaPermission } from "../permission/permission";
import { MiphaRecipeMetadataConfig } from "./declare";

// Public
export class MiphaRecipeMetadata {

    public static fromConfig(config: MiphaRecipeMetadataConfig): MiphaRecipeMetadata {

        const metadata: MiphaRecipeMetadata = this.fromIdentifier(config.identifier);
        for (const permission of config.requiredPermissions) {
            metadata.addRequiredPermission(
                MiphaPermission.fromConfig(permission),
            );
        }

        return metadata;
    }

    public static fromIdentifier(identifier: string): MiphaRecipeMetadata {

        return new MiphaRecipeMetadata(identifier);
    }

    private readonly _recipeIdentifier: string;

    private readonly _requiredPermissions: Set<MiphaPermission>;

    private constructor(identifier: string) {

        this._recipeIdentifier = identifier;

        this._requiredPermissions = new Set<MiphaPermission>();
    }

    public get identifier(): string {
        return this._recipeIdentifier;
    }

    public get requiredPermissions(): Set<MiphaPermission> {
        return this._requiredPermissions;
    }

    public addRequiredPermission(permission: MiphaPermission): this {

        this._requiredPermissions.add(permission);
        return this;
    }

    public toConfig(): MiphaRecipeMetadataConfig {

        const permissions: MiphaPermissionConfig[] = [];
        for (const permission of this._requiredPermissions) {
            permissions.push(permission.toConfig());
        }

        return {
            identifier: this._recipeIdentifier,
            requiredPermissions: permissions,
        };
    }
}
