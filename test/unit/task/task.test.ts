/**
 * @author WMXPY
 * @namespace Task
 * @description Task
 * @override Unit
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { MiphaTask } from '../../../src';
import { expectIsUUID } from '../../util/uuid';

describe('Given {MiphaTask} Class', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance: Chance.Chance = new Chance('task-task');

    it('should be able to construct from scratch', (): void => {

        const task: MiphaTask = MiphaTask.fromScratch();

        expect(task).to.be.instanceOf(MiphaTask);
        expectIsUUID(task.identifier);
    });
});
