import { swap } from '../visual_scripts/swap';
import { highlightBlocks } from '../visual_scripts/highlightBlocks';

export const bubbleSort = (tmpTable, tmpIdTable, swapped, n, i, currentSpeed) => {
    return new Promise(
        function(resolve) {
            var thisInterval = setInterval(
                function() {
                    if(!window.IS_SORTING) {
                        resolve('STOP_SORTING_BUTTON');
                        clearInterval(thisInterval);
                        return;
                    }
                    if(i >= n-1) {
                        if(!swapped) {
                            resolve('END_SORTING');
                            clearInterval(thisInterval);
                            return;
                        }
                        i = 0;
                        n = n - 1;
                        swapped = false;
                    }
                    highlightBlocks(tmpIdTable[i], tmpIdTable[i+1], currentSpeed);
                    if(tmpTable[i] > tmpTable[i + 1]) {
                        var tmp = tmpTable[i];
                        tmpTable[i] = tmpTable[i+1];
                        tmpTable[i+1] = tmp;
                
                        tmp = tmpIdTable[i];
                        tmpIdTable[i] = tmpIdTable[i+1];
                        tmpIdTable[i+1] = tmp;
                
                        swap(tmpIdTable[i], tmpIdTable[i+1]);
                        swapped = true;
                    }
                    i = i + 1;
            }, currentSpeed);
        }
    );
}