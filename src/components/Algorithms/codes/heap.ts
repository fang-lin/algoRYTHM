import {Executor} from './index';

export const name = 'Heap';

export const code = `
function adjustHeap(list: Array<number>, root: number, length: number): void {

    let p = root,
        chd = 2 * root;
    const tmp = list[root];

    while (chd < length) {
        if (chd < length && list[chd] < list[chd + 1])
            chd++;

        if (tmp < list[chd]) {
            list[p] = list[chd];
            p = chd;
            chd = 2 * p;
        } else
            break;
    }

    list[p] = tmp;
}

function heapSort(list: Array<number>): void {

    let i, tmp;
    const length = list.length - 1;

    for (i = length / 2 | 0; i >= 0; i--) {
        adjustHeap(list, i, length);
    }

    for (i = length; i > 0; i--) {
        tmp = list[0];
        list[0] = list[i];
        list[i] = tmp;

        adjustHeap(list, 0, i - 1);
    }
}
`;

export const executor: Executor = (list, collector) => {
    function adjustHeap(list: Array<number>, root: number, length: number): void {
        let p = root,
            chd = 2 * root;
        const tmp = list[root];

        while (chd < length) {
            if (chd < length && list[chd] < list[chd + 1]) {
                collector({list, comparing: [chd, chd + 1]});
                chd++;
            }

            if (tmp < list[chd]) {
                list[p] = list[chd];
                p = chd;
                chd = 2 * p;
                collector({list, swap: [chd]});
            } else break;
        }

        list[p] = tmp;
        collector({list, swap: [p]});
    }

    function heapSort(list: Array<number>): void {
        let i, tmp;
        const length = list.length - 1;

        for (i = (length / 2) | 0; i >= 0; i--) {
            adjustHeap(list, i, length);
        }

        for (i = length; i > 0; i--) {
            tmp = list[0];
            list[0] = list[i];
            list[i] = tmp;
            collector({list, swap: [0, i]});

            adjustHeap(list, 0, i - 1);
        }
    }

    heapSort(list);
};
