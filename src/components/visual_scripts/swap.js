export const swap = (first, second) => {
    //visual swap
    var firstBlock = document.getElementById(first);
    var secondBlock = document.getElementById(second);

    var tmpLeft = firstBlock.style.left;
    firstBlock.style.left = secondBlock.style.left;
    secondBlock.style.left = tmpLeft;
}