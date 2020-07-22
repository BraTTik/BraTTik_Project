document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const scoreDisplay = document.querySelector('#score');
    const startButton = document.querySelector('#start-button');
    let squares = [...document.querySelectorAll('.grid div')];
    const width = 10;
    let nextRandom = 0;
    let timerId;
    let score = 0;

    const colors = [
        'red',
        'orange',
        'blue',
        'purple',
        'black'
    ]

    const lTetronimo = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2, width*2+1],
        [width, width*2, width*2+1, width*2+2]
    ]

    const zTetronimo = [
        [width+1, width+2, width*2, width*2+1],
        [0, width, width+1, width*2+1],
        [width+1, width+2, width*2, width*2+1],
        [0, width, width+1, width*2+1],
    ]

    const tTetronimo = [
        [1, width, width+1, width+2],
        [1, width+1, width+2, width*2+1],
        [width, width+1, width+2, width*2+1],
        [1, width, width+1, width*2+1]
    ]

    const oTetronimo = [
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1],
    ]

    const iTetronimo = [
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3],
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3],
    ]

    const tetronimos = [lTetronimo, zTetronimo, oTetronimo, iTetronimo, tTetronimo];

    let currentPosition = 3;
    let random = Math.floor(Math.random()*tetronimos.length);
    let currentRotation = 0;
    let current = tetronimos[random][currentRotation];

    document.addEventListener('keyup', control);

    function draw(){
        current.forEach( index => {
            squares[currentPosition + index].classList.add('tetronimo');
            squares[currentPosition + index].style.backgroundColor = colors[random];
        })
    }

    function undraw(){
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetronimo');
            squares[currentPosition + index].style.backgroundColor = '';
        })
    }

    //timerId = setInterval(moveDown, 500);

    function moveDown(){
        undraw();
        currentPosition += width;
        draw();
        freeze();
    }

    function control(e){
        if(e.keyCode === 37){
            moveLeft();
        }else if(e.keyCode === 38){
            rotate();
        }else if(e.keyCode === 39){
            moveRight();
        }else if(e.keyCode === 40){
            moveDown();
        }
    }

    function moveLeft(){
        undraw();
        const isLeftEdge = current.some( index => (currentPosition + index) % 10 === 0);
        if(!isLeftEdge){
            currentPosition -= 1;
        }
        if(current.some(index => squares[currentPosition+index].classList.contains('taken'))) currentPosition += 1;

        draw();
    }

    function moveRight(){
        undraw();
        const isRightEdge = current.some( index => (currentPosition + index) % width === width -1);
        if(!isRightEdge){
            currentPosition += 1;
        }

        if(current.some(index => squares[currentPosition+index].classList.contains('taken'))) currentPosition -= 1;

        draw();

    }

    function rotate(){
        undraw();
        currentRotation ++;
        if(currentRotation === current.length){
            currentRotation = 0;
        }
        current = tetronimos[random][currentRotation];

        draw();
    }

    function freeze(){

        if(current.some( index => squares[currentPosition + index + width].classList.contains('taken'))){
            current.forEach( index => squares[currentPosition+index].classList.add('taken'));

            //start new tetronimo
            random = nextRandom;
            nextRandom = Math.floor(Math.random()*tetronimos.length);
            currentPosition = 4;
            current = tetronimos[random][currentRotation];
            draw();
            displayNextShape();
            addScore();
            gameOver();
        }
    }


    //show next tetronimo
    const displaySquares = document.querySelectorAll('.mini-grid div');
    const displayWidth = 4;
    let displayIndex = 0;

    const nextTetronimos = [
        [1, displayWidth+1, displayWidth*2+1, 2], //lTetronimo
        [displayWidth, displayWidth+1, displayWidth*2+1, displayWidth*2+2], //zTetronimo
        [1, 2, displayWidth+1, displayWidth+2], //oTetronimo
        [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1], //iTetronimo
        [1, displayWidth, displayWidth+1, displayWidth+2], // tTetronimo
    ]

    function displayNextShape(){
        displaySquares.forEach(square => {
            square.classList.remove('tetronimo');
            square.style.backgroundColor = '';
        });

        const displayTetronimo = nextTetronimos[nextRandom];

        displayTetronimo.forEach( index => {
            displaySquares[index + displayIndex].classList.add('tetronimo');
            displaySquares[index + displayIndex].style.backgroundColor = colors[nextRandom];
        })
    }

    startButton.addEventListener('click', () => {
        if(timerId){
            clearInterval(timerId);
            timerId = null;
        }else{
            draw();
            timerId = setInterval(moveDown, 1000);
            nextRandom = Math.floor(Math.random()*tetronimos.length);
            displayNextShape();
        }
    })

    function addScore(){

        for(let i = 0; i < 199; i+=width){
            const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9];
            if(row.every( index => squares[index].classList.contains('taken'))){
                score += 10;
                scoreDisplay.innerHTML = score;
                row.forEach( index => {
                    squares[index].classList.remove('taken');
                    squares[index].classList.remove('tetronimo');
                    squares[index].style.backgroundColor = '';
                })
                const removedSquares = squares.splice(i, width);
                squares = removedSquares.concat(squares);
                squares.forEach( cell => grid.appendChild(cell));
            }
        }
    }

    function gameOver(){
        if(current.some( index => squares[currentPosition+index].classList.contains('taken'))){
            scoreDisplay.innerHTML = 'Game Over';
            clearInterval(timerId);
        }
    }
})