import {Executor} from './index';

export const name = 'Insert';

export const code = `
function insertSort(list: Array<number>): void {

    let next, j;
    const length = list.length;

    for (let i = 1; i < length; i++) {
        next = list[i];

        for (j = i - 1; j >= 0 && next < list[j]; j--)
            list[j + 1] = list[j];

        list[j + 1] = next;
    }
}
`;

export const executor: Executor = (list, collector) => {
    function insertSort(list: Array<number>): void {
        let next, j;
        const length = list.length;

        for (let i = 1; i < length; i++) {
            next = list[i];
            collector({list, swap: [i]});

            for (j = i - 1; j >= 0 && next < list[j]; j--) {
                list[j + 1] = list[j];
                collector({list, swap: [j + 1, j]});
            }

            list[j + 1] = next;
            collector({list, swap: [j + 1]});
        }
    }

    insertSort(list);
};
