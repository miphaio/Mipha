/**
 * @author WMXPY
 * @namespace Util
 * @description Assert Result
 * @override Test
 */

import { MarkedResult } from "@sudoo/marked";
import { END_SIGNAL, IMarkedResultSucceed } from "@sudoo/marked/declare/evaluate";

export const assertSucceedMarkedResult: (
    result: MarkedResult,
) => asserts result is IMarkedResultSucceed = (
    result: MarkedResult,
    ): asserts result is IMarkedResultSucceed => {

        if (result.signal !== END_SIGNAL.SUCCEED) {
            throw new Error('Invalid marked result');
        }
        return;
    };
