export const highlightBlocks = (first, second, currentSpeed) => {
    var firstBlock = document.getElementById(first);
    var secondBlock = document.getElementById(second);

    firstBlock.style.backgroundColor = "#ffff00";
    var inter1 = setInterval(() => {
        firstBlock.style.backgroundColor = "#99ff66";
        clearInterval(inter1);
    }, currentSpeed - 10);
    secondBlock.style.backgroundColor = "#ffff00";
    var inter2 = setInterval(() => {
        secondBlock.style.backgroundColor = "#99ff66";
        clearInterval(inter2);
    }, currentSpeed - 10);
}