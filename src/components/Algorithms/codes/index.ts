import * as binaryInsert from './binaryInsert';
import * as bubble from './bubble';
import * as heap from './heap';
import * as insert from './insert';
import * as merge from './merge';
import * as quick from './quick';
import * as select from './select';
import * as shaker from './shaker';
import * as shell from './shell';

export interface Frame {
    list: Array<number>;
    comparing?: [number, number];
    swap?: [number, number] | [number];
}

export interface Executor {
    (list: Array<number>, collector: (frame: Frame) => void): void;
}

export interface Code {
    code: string;
    name: string;
    executor: Executor;
}

export enum AlgorithmKey {
    binaryInsert = 'binary-insert',
    bubble = 'bubble',
    heap = 'heap',
    insert = 'insert',
    merge = 'merge',
    quick = 'quick',
    select = 'select',
    shaker = 'shaker',
    shell = 'shell',
}

const algorithms: Record<AlgorithmKey, Code> = {
    [AlgorithmKey.binaryInsert]: binaryInsert,
    [AlgorithmKey.bubble]: bubble,
    [AlgorithmKey.heap]: heap,
    [AlgorithmKey.insert]: insert,
    [AlgorithmKey.merge]: merge,
    [AlgorithmKey.quick]: quick,
    [AlgorithmKey.select]: select,
    [AlgorithmKey.shaker]: shaker,
    [AlgorithmKey.shell]: shell,
};

export default algorithms;
