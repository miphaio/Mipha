/**
 * @author WMXPY
 * @namespace Event
 * @description Event
 * @override Unit
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { MiphaEvent } from '../../../src';
import { expectIsUUID } from '../../util/uuid';

describe('Given {MiphaEvent} Class', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance: Chance.Chance = new Chance('event-event');

    it('should be able to construct from scratch', (): void => {

        const event: MiphaEvent = MiphaEvent.fromScratch();

        expect(event).to.be.instanceOf(MiphaEvent);
        expectIsUUID(event.identifier);
    });
});
