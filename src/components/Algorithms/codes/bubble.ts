import {Executor} from './index';

export const name = 'Bubble';

export const code = `
function bubbleSort(list: Array<number>): void {

    let tmp;

    for (let i = list.length; i > 0; i--) {
        for (let j = 0; j < i; j++) {
            if (list[j] > list[j + 1]) {
                tmp = list[j];
                list[j] = list[j + 1];
                list[j + 1] = tmp;
            }
        }
    }
}
`;

export const executor: Executor = (list, collector) => {
    function bubbleSort(list: Array<number>): void {
        let tmp;

        for (let i = list.length; i > 0; i--) {
            for (let j = 0; j < i; j++) {
                if (list[j] > list[j + 1]) {
                    collector({list, comparing: [j, j + 1]});
                    tmp = list[j];
                    list[j] = list[j + 1];
                    list[j + 1] = tmp;
                    collector({list, swap: [j, j + 1]});
                }
            }
        }
    }

    bubbleSort(list);
};
