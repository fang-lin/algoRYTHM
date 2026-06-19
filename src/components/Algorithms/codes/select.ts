import {Executor, swap} from './index';

export const name = 'Select';

export const code = `
function selectSort(list: Array<number>): void {

    const length = list.length;
    let i, j, k, tmp;

    for (i = 0; i < length; i++) {
        k = i;

        for (j = i + 1; j < length; j++) {
            if (list[j] < list[k]) {
                k = j;
            }
        }

        if (k != i) {
            tmp = list[k];
            list[k] = list[i];
            list[i] = tmp;
        }
    }
}
`;

export const executor: Executor = (list, collector) => {
    function selectSort(list: Array<number>): void {
        const length = list.length;
        let i, j, k;

        for (i = 0; i < length; i++) {
            k = i;

            for (j = i + 1; j < length; j++) {
                if (list[j] < list[k]) {
                    collector({list, comparing: [j, k]});
                    k = j;
                }
            }

            if (k != i) {
                collector({list, comparing: [i, k]});
                swap(list, k, i);
                collector({list, swap: [i, k]});
            }
        }
    }

    selectSort(list);
};
