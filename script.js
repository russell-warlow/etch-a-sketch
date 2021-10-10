function createGrid(n) {
    const mainDiv = document.getElementById('main');
    const widthInPixels = getComputedStyle(mainDiv).width; // why doesn't clientWidth work?!
    let width = parseInt(widthInPixels.substring(0, widthInPixels.length-2));
    const gap = 10;
    const squareLength = (width-(n-1)*gap)/n; // per row ... [n] boxes, [n-1] gaps?
    let newRow = document.createElement('div');
    newRow.style.height = squareLength + 'px';
    newRow.style.width = width + 'px';
    newRow.className = 'row';
    for(let i=0;i<n*n; i++) {
        let newDiv = document.createElement('div');
        newDiv.className = 'square';
        newDiv.style.height = squareLength + 'px';
        newDiv.style.width = squareLength + 'px';
        newDiv.addEventListener('mouseenter', function(event) {
            newDiv.style.backgroundColor = randomRGBColor();
        });
        newRow.appendChild(newDiv);
    }
    mainDiv.appendChild(newRow);
}

function randomRGBColor() {
    let x = Math.floor(Math.random() * 256);
    let y = Math.floor(Math.random() * 256);
    let z = Math.floor(Math.random() * 256);
    return "rgb(" + x + "," + y + "," + z + ")";
}

function refreshPage(event) {
    let userInput = window.prompt('What should the new grid size be?', '0');
    let newGridSize = parseInt(userInput);
    if(isNaN(newGridSize)) {
        alert('please enter a number');
        refreshPage(event);
    }
    if(newGridSize > 100) {
        alert('number too large. please enter number less than or equal to 100');
        refreshPage(event);
    }
    const nodes = Array.from(document.getElementsByClassName('row'));
    nodes[0].remove();
    createGrid(newGridSize);
}

const button = document.getElementById('refresh');
button.addEventListener('click', refreshPage);
createGrid(8);
