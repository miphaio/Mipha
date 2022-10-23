/**
 * @author WMXPY
 * @namespace Distance
 * @description Levenshtein
 */

export const levenshteinDistance = (source: string, target: string): number => {

    const matrix: number[][] = new Array(target.length + 1)
        .fill(null)
        .map(() => {
            return new Array(source.length + 1)
                .fill(null);
        }) as number[][];

    for (let sourceIndex: number = 0;
        sourceIndex <= source.length;
        sourceIndex++) {

        matrix[0][sourceIndex] = sourceIndex;
    }

    for (let targetIndex: number = 0;
        targetIndex <= target.length;
        targetIndex++) {

        matrix[targetIndex][0] = targetIndex;
    }

    for (let targetIndex: number = 1;
        targetIndex <= target.length;
        targetIndex++) {

        for (let sourceIndex: number = 1;
            sourceIndex <= source.length;
            sourceIndex++) {

            const cost: number =
                (source[sourceIndex - 1] === target[targetIndex - 1])
                    ? 0
                    : 1;

            matrix[targetIndex][sourceIndex] = Math.min(
                matrix[targetIndex][sourceIndex - 1] + 1,
                matrix[targetIndex - 1][sourceIndex] + 1,
                matrix[targetIndex - 1][sourceIndex - 1] + cost,
            );
        }
    }

    return matrix[target.length][source.length];
};
