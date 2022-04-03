import { swap } from '../visual_scripts/swap';
import { highlightBlocks } from '../visual_scripts/highlightBlocks';

export const selectionSort = (arr, arrID, n, currentSpeed) => {
    function selectionInside(arr, arrID, j, min_index) {
        return new Promise((resolve, reject) => {
			var insideInterval = setInterval(() => {
                if(!window.IS_SORTING) {
                    resolve("STOP_SORTING")
                    clearInterval(insideInterval);
                    return;
                }
                if(!(j<n)) {
                    resolve(min_index);
                    clearInterval(insideInterval);
                    return;
                }

                highlightBlocks(arrID[j], arrID[min_index], currentSpeed);
                if(arr[j] < arr[min_index]) {
                    min_index = j;
                }
                j++;

            }, currentSpeed);
		});
    }

    async function selection(arr, arrID, n, currentSpeed) {
        var min_index;
        for(var i = 0; i < n-1; i++) {   
            min_index = i;

            var resolveValue = await selectionInside(arr, arrID, i+1, min_index);
            if(resolveValue == "STOP_SORTING") {
                return resolveValue;
            } else {
                min_index = resolveValue;
                
                highlightBlocks(arrID[i], arrID[min_index], currentSpeed);
                var tmp = arr[i];
                arr[i] = arr[min_index];
                arr[min_index] = tmp;
                    
                tmp = arrID[i];
                arrID[i] = arrID[min_index];
                arrID[min_index] = tmp;
                swap(arrID[i], arrID[min_index]);
            }
        }
        return 'END_SORTING';
    }

    return new Promise(
        function(resolve) {
            resolve(selection(arr, arrID, n, currentSpeed));
        }
    );
}