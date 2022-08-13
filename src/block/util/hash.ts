/**
 * @author WMXPY
 * @namespace Block_Util
 * @description Hash
 */

import * as MD5 from "md5";

export const hashString = (target: string): string => {

    return MD5(target);
};
