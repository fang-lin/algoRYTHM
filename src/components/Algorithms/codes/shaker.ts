import {Executor} from './index';

export const name = 'Shaker';

export const code = `
function shakerSort(list: Array<number>): void {

    let i, left = 0,
        right = list.length,
        k = 0, tmp;

    while (left < right) {
        for (i = left; i < right; i++) {
            if (list[i] > list[i + 1]) {
                tmp = list[i];
                list[i] = list[i + 1];
                list[i + 1] = tmp;

                k = i;
            }
        }

        right = k;

        for (i = right; i > left; i--) {
            if (list[i - 1] > list[i]) {
                tmp = list[i];
                list[i] = list[i - 1];
                list[i - 1] = tmp;

                k = i;
            }
        }

        left = k;
    }
}
`;

export const executor: Executor = (list, collector) => {
    function shakerSort(list: Array<number>): void {
        let i,
            left = 0,
            right = list.length,
            k = 0,
            tmp;

        while (left < right) {
            for (i = left; i < right; i++) {
                if (list[i] > list[i + 1]) {
                    collector({list, comparing: [i, i + 1]});
                    tmp = list[i];
                    list[i] = list[i + 1];
                    list[i + 1] = tmp;
                    collector({list, swap: [i, i + 1]});
                    k = i;
                }
            }

            right = k;

            for (i = right; i > left; i--) {
                if (list[i - 1] > list[i]) {
                    collector({list, comparing: [i, i - 1]});
                    tmp = list[i];
                    list[i] = list[i - 1];
                    list[i - 1] = tmp;
                    collector({list, swap: [i, i - 1]});
                    k = i;
                }
            }

            left = k;
        }
    }

    shakerSort(list);
};
