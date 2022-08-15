/**
 * @author WMXPY
 * @namespace Util
 * @description Hash
 */

import * as MD5 from "md5";

// Internal
export const hashString = (target: string): string => {

    return MD5(target);
};
