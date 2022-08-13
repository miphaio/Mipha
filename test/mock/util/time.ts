/**
 * @author WMXPY
 * @namespace Block_Util
 * @description Time
 * @override Mock
 */

export const mockSleep = (time: number): Promise<void> => {

    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
};
