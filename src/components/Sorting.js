import './../css/sorting.css';
import { useState, useEffect } from 'react';

//LISTENERS
import useWindowSize from './listeners/useWindowSize';

//VISUAL FUNCTIONS
import { startSortingVisual } from './visual_scripts/startSortingVisual';
import { endSortingVisual } from './visual_scripts/endSortingVisual';
import { ifErrors } from './visual_scripts/ifErrors';


//ALGORITHMS
import { bubbleSort } from './sorting_algorithms/bubbleSort';
import { quickSort } from './sorting_algorithms/quickSort';
import { insertionSort } from './sorting_algorithms/insertionSort';
import { selectionSort } from './sorting_algorithms/selectionSort';

function Sorting() {
	const [minRand, setMinRand] = useState(0)
	const [maxRand, setMaxRand] = useState(100)
	const [amount, setAmount] = useState(10)

	const [currentAlgorithm, setCurrentAlgorithm] = useState("bubble")
	const [currentSpeed, setCurrentSpeed] = useState(500)

	const [sortingTable, setSortingTable] = useState([])
	const [maxValue, setMaxValue] = useState(0)

	const [sortingIdTable, setSortingIdTable] = useState([])
	
	const [blockWidth, setBlockWidth] = useState(0)
	const [containerHeight, setContainerHeight] = useState(0)

	const [isSorting, setIsSorting] = useState(false)

	const size = useWindowSize();
	const [currentTime, setCurrentTime] = useState(Date.now())

	async function fetchData() {
		var tmpSort = await randomizeSortingTable();
		var maxV = await getMaxValue(tmpSort);
		await setStartingBlocksPosition(maxV, tmpSort);
	}

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		if(Date.now() - currentTime > 100) {
			if(!isSorting && ifErrors('randomize', minRand, maxRand, amount) == 0){
				fetchData()
			}
			setCurrentTime(Date.now())
		}
	}, [size]);


	async function randomizeSortingTable() {
		var newSortingTable = [];
		var newSortingIdTable = [];

		for(var j=0; j<amount; j++) {
			newSortingIdTable.push(j);
			newSortingTable.push(Math.floor(Math.random() * (parseInt(maxRand) - parseInt(minRand-1)) + parseInt(minRand)));
		}
		setSortingTable(newSortingTable);
		setSortingIdTable(newSortingIdTable);
		return newSortingTable;
	}

	async function getMaxValue(tmpSort) {
		var tmpMaxValue = 0;
		for(const el of tmpSort) {
			if(el > tmpMaxValue) {
				tmpMaxValue = el;
			}
		}
		setMaxValue(tmpMaxValue);
		return tmpMaxValue;
	}

	async function setStartingBlocksPosition(maxV, tmpSort) {
		var blocks = document.getElementsByClassName("sorting-block");
		var containerWidth = blocks[0].parentElement.clientWidth;
		var containerHeight = blocks[0].parentElement.clientHeight;
		setContainerHeight(containerHeight);

		if(amount <= 50) {
			var elementWidth = containerWidth/tmpSort.length - 4;
			setBlockWidth(elementWidth);
	
			for(var i = 0; i < blocks.length; i++) {
				blocks[i].style.left = i * 4 + i * elementWidth + "px";
				
				blocks[i].style.bottom = "0";
				blocks[i].style.width = elementWidth + "px";
				if((tmpSort[i]/maxV) * containerHeight == 0) {
					blocks[i].style.height = "1px";
				} else {
					blocks[i].style.height = (tmpSort[i]/maxV) * containerHeight + "px";
				}
			}
		} else {
			var elementWidth = containerWidth/tmpSort.length;
			setBlockWidth(elementWidth);

			for(var i = 0; i < blocks.length; i++) {
				blocks[i].style.left = i * elementWidth + "px";
				
				blocks[i].style.bottom = "0";
				blocks[i].style.width = elementWidth + "px";

				if((tmpSort[i]/maxV) * containerHeight == 0) {
					blocks[i].style.height = "1px";
				} else {
					blocks[i].style.height = (tmpSort[i]/maxV) * containerHeight + "px";
				}
			}
		}
		
	}

	useEffect(() => {
		window.IS_SORTING = isSorting;
		if(isSorting) {
			if(ifErrors('sort', minRand, maxRand, amount) > 0) {
				setIsSorting(false);
			} else {
				if(currentAlgorithm == "bubble") {
					bubbleSort(sortingTable, sortingIdTable, false, sortingTable.length, 0, currentSpeed).then(
						function(res) {
							setIsSorting(false);
						}
					);
				} else if(currentAlgorithm == "quicksort") {
					quickSort(sortingTable, sortingIdTable, 0, sortingTable.length - 1, currentSpeed).then(
						function(res) {
							setIsSorting(false);
						}
					);
				} else if(currentAlgorithm == "insertion") {
					insertionSort(sortingTable, sortingIdTable, sortingTable.length, currentSpeed).then(
						function(res) {
							setIsSorting(false);
						}
					);
				} else if(currentAlgorithm == "selection") {
					selectionSort(sortingTable, sortingIdTable, sortingTable.length, currentSpeed).then(
						function(res) {
							setIsSorting(false);
						}
					);
				} else {
					return;
				}
			}
			
			startSortingVisual();
		} else {
			endSortingVisual();
		}
	}, [isSorting]);

	return (
		<div className="sort-card">
			<div className="background-run-visual"/>
			<div className='sort-settings'>
				<div className='sort-input-block'>
					<div className="error-msg" id="minErr"></div>
					<div className='input-label'>Min:</div>
					<input type="number" value={minRand} onChange={event => setMinRand(event.target.value)} />
				</div>
				<div className='sort-input-block'>
					<div className="error-msg" id="maxErr"></div>
					<div className='input-label'>Max:</div>
					<input type="number" value={maxRand} onChange={event => setMaxRand(event.target.value)} />
				</div>
				<div className='sort-input-block'>
					<div className="error-msg" id="amountErr"></div>
					<div className='input-label'>Amount:</div>
					<input type="number" value={amount} onChange={event => setAmount(event.target.value)} />
				</div>
				<div className='randomize-button' onClick={() => {
						if(!isSorting && ifErrors('randomize', minRand, maxRand, amount) == 0){
							fetchData()
						}
					}}>RANDOMIZE</div>
			</div>
			<div className='sort-run'>
				<div className='input-label'>Algorithm:</div>
				<select value={currentAlgorithm} onChange={event => setCurrentAlgorithm(event.target.value)}>
					<option value="bubble">Bubble Sort</option>
					<option value="quicksort">Quicksort</option>
					<option value="insertion">Insertion Sort</option>
					<option value="selection">Selection Sort</option>
				</select>

				<div className='sort-button stick-right' onClick={() => {
						setIsSorting(!isSorting)
					}}>SORT</div>
			
				<div className='sort-input-block speed-input stick-right'>
					<div className='input-label'>Step speed (ms):</div>
					<input type="number" value={currentSpeed} onChange={event => setCurrentSpeed(event.target.value)} />
				</div>
			</div>
			<div className="sorting-container">
				<div className="sorting-legend">
					<div className="legend-4 legend-element">
						<div className="up-horizontal" />
						<span>{maxValue}</span>
					</div>
					<div className="legend-3 legend-element">
						<span>{Math.round(maxValue * 0.75)}</span>
						<div className="down-horizontal" />
					</div>
					<div className="legend-2 legend-element">
						<span>{Math.round(maxValue * 0.5)}</span>
						<div className="down-horizontal" />
					</div>
					<div className="legend-1 legend-element">
						<span>{Math.round(maxValue * 0.25)}</span>
						<div className="down-horizontal" />
					</div>
					<div className="legend-0 legend-element">
						<span>0</span>
						<div className="down-horizontal" />
					</div>
				</div>
				<div className="sorting-table">
					{
						sortingTable.map(function(item, i){
							return  <div className="sorting-block" id={i} key={i}>
										{
											blockWidth > (maxValue.toString().length * 10) && ((sortingTable[sortingIdTable.findIndex(id => id === i)]/maxValue) * containerHeight) > 24 ?
												<span>
													{sortingTable[sortingIdTable.findIndex(id => id === i)]}
												</span>
											:
												<div className='sorting-block-popup'>{sortingTable[sortingIdTable.findIndex(id => id === i)]}</div>
										}
									</div>
						})
					}
				</div>
			</div>
		</div>
	);
}

export default Sorting;
