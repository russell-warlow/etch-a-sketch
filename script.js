/* 

make [n]x[n] grid
div for each row
-> div for each column

*/

function createRow(n) {
    const newRow = document.createElement('div');
    newRow.className = 'row';
    for(let i=0; i<n; i++) {
        const newDiv = document.createElement('div');
        newDiv.className = 'square';
        // const newText = document.createElement('text');
        // newText.textContent = 'foo';
        // newDiv.appendChild(newText);
        newRow.appendChild(newDiv);
    }
    const mainBody = document.getElementById('main');
    mainBody.appendChild(newRow);
}

function createGrid(n) {
    for(let i=0; i<n; i++) {
        createRow(n);
    }
}

function createGridNoRowGaps(n) {
    // calculate height and width of box
    const mainDiv = document.getElementById('main');
    console.log('maindiv: ' + mainDiv);
    const width = 960; // why doesn't clientWidth work?!
    console.log('width: ' + width);
    const gap = 10;
    console.log('gap: ' + gap);
    // per row ... [n] boxes, [n-1] gaps?
    const squareLength = (width-(n-1)*gap)/n;
    console.log('square dimension: ' + squareLength);
    for(let i=0;i<n; i++) {
        let newRow = document.createElement('div');
        newRow.style.height = squareLength + 'px';
        newRow.style.width = width + 'px';
        newRow.className = 'row';
        for(let j=0; j<n; j++) {
            let newDiv = document.createElement('div');
            newDiv.className = 'square';
            newDiv.style.height = squareLength + 'px';
            newDiv.style.width = squareLength + 'px';
            newRow.appendChild(newDiv);
        }
        mainDiv.appendChild(newRow);
    }
}

function createGridWrap(n) {
    // calculate height and width of box
    const mainDiv = document.getElementById('main');
    console.log('maindiv: ' + mainDiv);
    const width = 960; // why doesn't clientWidth work?!
    console.log('width: ' + width);
    const gap = 10;
    console.log('gap: ' + gap);
    // per row ... [n] boxes, [n-1] gaps?
    const squareLength = (width-(n-1)*gap)/n;
    console.log('square dimension: ' + squareLength);
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
        console.log('please enter a number');
        refreshPage(event);
    }
    if(newGridSize > 100) {
        alert('number too large. please enter number less than or equal to 100');
        console.log('number too large. please enter number less than or equal to 100');
        refreshPage(event);
    }
        
    const nodes = Array.from(document.getElementsByClassName('row'));
    if(nodes.length > 1) {
        console.log('too many rows.');
        return;
    }
    if(nodes.length == 1) {
        nodes[0].remove();
    }

    createGridWrap(newGridSize);
}

const button = document.getElementById('refresh');
button.addEventListener('click', refreshPage);
createGridWrap(8);
