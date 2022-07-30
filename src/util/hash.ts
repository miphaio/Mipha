/**
 * @author WMXPY
 * @namespace Util
 * @description Hash
 */

import MD5 from "md5";

export const hashString = (target: string): string => {

    return MD5(target);
};
