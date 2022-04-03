export const startSortingVisual = () => {
    //change button
    var sortButton = document.getElementsByClassName('sort-button')[0];
    sortButton.innerHTML = "STOP";
    sortButton.style.color = "red";
    sortButton.style.border = "solid 2px red";
    sortButton.classList.add('inactive-sort-button');
    //change things to grey
    var inactiveColor = "#cccccc"
    document.body.style.backgroundColor = inactiveColor;
    var inputs = document.getElementsByTagName('input');
    for(var i=0; i<inputs.length; i++) {
        inputs[i].style.backgroundColor = inactiveColor;
        inputs[i].classList.add('inactive-cursor');
        inputs[i].disabled = "true";
    } 
    var select = document.getElementsByTagName('select')[0];
    select.style.backgroundColor = inactiveColor;
    select.disabled = "true";

    var randomizeButton = document.getElementsByClassName('randomize-button')[0];
    randomizeButton.style.color = "#808080";
    randomizeButton.style.border = "solid 2px #808080";
    randomizeButton.classList.add('inactive-button');
    randomizeButton.classList.add('inactive-cursor');
}