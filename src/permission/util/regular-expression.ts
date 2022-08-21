/**
 * @author WMXPY
 * @namespace Permission_Util
 * @description Regular Expression
 */

// Internal
export const ModuleIdentifierAssignedFormatRegExp = new RegExp(`^[a-zA-Z0-9._-]+$`);
// Internal
export const ScopeIdentifierAssignedFormatRegExp = new RegExp(`^[a-zA-Z0-9\\*_-]+$`);
// Internal
export const ResourceIdentifierAssignedFormatRegExp = new RegExp(`^[a-zA-Z0-9\\*_-]+$`);

// Internal
export const ModuleIdentifierRequiredFormatRegExp = new RegExp(`^[a-zA-Z0-9._-]+$`);
// Internal
export const ScopeIdentifierRequiredFormatRegExp = new RegExp(`^[a-zA-Z0-9_-]+$`);
// Internal
export const ResourceIdentifierRequiredFormatRegExp = new RegExp(`^[a-zA-Z0-9_-]+$`);
