import {Executor} from './index';

export const name = 'Shell';

export const code = `
function shellSort(list: Array<number>): void {

    const length = list.length;
    let gap = length / 2 | 0,
        i, j, tmp;

    while (gap > 0) {
        for (i = gap; i < length; i++) {
            tmp = list[i];
            j = i - gap;

            while (j >= 0 && tmp < list[j]) {
                list[j + gap] = list[j];
                j = j - gap;
            }

            list[j + gap] = tmp;
        }

        gap = gap / 2 | 0;
    }
}
`;

export const executor: Executor = (list, collector) => {
    function shellSort(list: Array<number>): void {
        const length = list.length;
        let gap = (length / 2) | 0,
            i,
            j,
            tmp;

        while (gap > 0) {
            for (i = gap; i < length; i++) {
                tmp = list[i];
                j = i - gap;

                while (j >= 0 && tmp < list[j]) {
                    collector({list, comparing: [j, i]});
                    list[j + gap] = list[j];
                    j = j - gap;
                    collector({list, swap: [j + gap, j]});
                }

                list[j + gap] = tmp;
                collector({list, swap: [j + gap, i]});
            }

            gap = (gap / 2) | 0;
        }
    }

    shellSort(list);
};
