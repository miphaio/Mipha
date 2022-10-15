/**
 * @author WMXPY
 * @namespace Util
 * @description UUID
 * @override Unit
 */

import { expect } from 'chai';

export const expectIsUUID = (value: string): void => {

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect(value).to.be.lengthOf(36);
    expect(value).to.be.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
};
