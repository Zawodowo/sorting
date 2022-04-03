import { swap } from '../visual_scripts/swap';
import { highlightBlocks } from '../visual_scripts/highlightBlocks';

export const insertionSort = (arr, arrID, n, currentSpeed) => {
    function insertionInside(arr, arrID, j) {
        return new Promise((resolve, reject) => {
			var insideInterval = setInterval(() => {
                if(!window.IS_SORTING) {
                    resolve("STOP_SORTING")
                    clearInterval(insideInterval);
                    return;
                }
                if(!(j>0 && arr[j] < arr[j-1])) {
                    resolve("END_PART")
                    clearInterval(insideInterval);
                    return;
                }
                
                highlightBlocks(arrID[j], arrID[j-1], currentSpeed);
                //SWAP
                var tmp = arr[j];
                arr[j] = arr[j-1];
                arr[j-1] = tmp;
                            
                tmp = arrID[j];
                arrID[j] = arrID[j-1];
                arrID[j-1] = tmp;
                swap(arrID[j], arrID[j-1]);

                j -= 1;
            }, currentSpeed);
		});
    }

    async function insertion(arr, arrID, n, currentSpeed) {
        var j;
        for(var i = 1; i < n; i++) {
                j = i;
                highlightBlocks(arrID[j], arrID[j-1], currentSpeed);
                var resolveValue = await insertionInside(arr, arrID, j);
                if(resolveValue == "STOP_SORTING") {
                    return resolveValue;
                }
        }
        return 'END_SORTING';
    }

    return new Promise(
        function(resolve) {
            resolve(insertion(arr, arrID, n, currentSpeed));
        }
    );
}