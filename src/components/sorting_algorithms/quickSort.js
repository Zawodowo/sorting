import { swap } from '../visual_scripts/swap';
import { highlightBlocks } from '../visual_scripts/highlightBlocks';

export const quickSort = (tmpTable, tmpIdTable, left, right, currentSpeed) => {
    function partition(arr, arrID, left, right) {
		var pivot = arr[right];
		var ind = left - 1;

		var j=left;
		return new Promise((resolve, reject) => {
			var interval = setInterval(() => {
                if(!window.IS_SORTING) {
                    clearInterval(interval);
					resolve(-100);
                }
				if(j>=right) {
					//end
					highlightBlocks(arrID[ind+1], arrID[right], currentSpeed);
					var tmp = arr[ind+1];
					arr[ind+1] = arr[right];
					arr[right] = tmp;
			
					tmp = arrID[ind+1];
					arrID[ind+1] = arrID[right];
					arrID[right] = tmp;
					swap(arrID[ind+1], arrID[right]);
					clearInterval(interval);
					resolve(ind+1);
				}
				highlightBlocks(arrID[j], arrID[right], currentSpeed);
				if(parseInt(arr[j]) <= parseInt(pivot)) {
					ind++;

					//SWAP
					var tmp = arr[ind];
					arr[ind] = arr[j];
					arr[j] = tmp;

					tmp = arrID[ind];
					arrID[ind] = arrID[j];
					arrID[j] = tmp;
					swap(arrID[ind], arrID[j]);
					/////
				}
				j++;
			}, currentSpeed);
		});
	}
    async function quickSorting(tmpTable, tmpIdTable, left, right) {
		var stack = [];
		stack.push(left);
		stack.push(right);

		while(stack.length-1 >= 0) {
			right = stack.pop();
			left = stack.pop();

			var part = await partition(tmpTable, tmpIdTable, left, right);
            if(part==-100) {
                return false;
            }

			if(part - 1 > left) {
				stack.push(left);
				stack.push(part - 1);
			}

			if(part + 1 < right) {
				stack.push(part + 1);
				stack.push(right);
			}
		}

		return false;
	}

    return new Promise(
        function(resolve) {
            resolve(quickSorting(tmpTable, tmpIdTable, left, right));
        }
    );
}