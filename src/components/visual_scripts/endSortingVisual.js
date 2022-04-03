export const endSortingVisual = () => {
    //change button
    var sortButton = document.getElementsByClassName('sort-button')[0];
    sortButton.innerHTML = "SORT";
    sortButton.style.color = "#4ce600";
    sortButton.style.border = "solid 2px #4ce600";
    sortButton.classList.remove('inactive-sort-button');
    //change things to white
    var activeColor = "#ffffff"
    document.body.style.backgroundColor = activeColor;
    var inputs = document.getElementsByTagName('input');
    for(var i=0; i<inputs.length; i++) {
        inputs[i].style.backgroundColor = activeColor;
        inputs[i].classList.remove('inactive-cursor');
        inputs[i].removeAttribute("disabled");
    } 
    var select = document.getElementsByTagName('select')[0];
    select.style.backgroundColor = activeColor;
    select.removeAttribute("disabled");

    var randomizeButton = document.getElementsByClassName('randomize-button')[0];
    randomizeButton.style.color = "#4ce600";
    randomizeButton.style.border = "solid 2px #4ce600";
    randomizeButton.classList.remove('inactive-button');
    randomizeButton.classList.remove('inactive-cursor');
}