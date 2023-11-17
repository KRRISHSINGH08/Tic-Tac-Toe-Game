const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [1,4,7],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// initialize the game
function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    playAudio("/audio/Click.wav")
    // Empty all boxes at UI
    boxes.forEach((box, index) => {
        box.innerHTML = "";
        boxes[index].style.pointerEvents = "all";
        // initialize box with css property again 
        box.classList = `box box${index+1}`;
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }
    else {
        currentPlayer = "X";
    }

    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver(){
    let answer = "";

    winningPositions.forEach((position) => {
        // all 3 boxes should be non-empty and exactly same value in each box
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
            && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])) {
                
                // check if winner is X
                if(gameGrid[position[0]] === "X") 
                    answer = "X";
                else 
                    answer = "O";

                // disable pointer so no other winner on click
                boxes.forEach((box) =>{
                    box.style.pointerEvents = "none";
                });

                // now we know X/O is a winner
                // green background 
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
            }
    });

    // it means we have a winner
    if(answer !== "") {
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    // check whether there is a tie
    let fillcount = 0;
    gameGrid.forEach((box) =>{
        if(box !== "")
            fillcount++;
    });

    if(fillcount === 9){
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
    }
}

function playAudio(url){
    new Audio(url).play();
}

function handleClick(index) {
    if(gameGrid[index] === "") {
        // click sound 
        playAudio("/audio/Click.wav");

        // UI change
        boxes[index].innerText = currentPlayer;
        // logic change
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";

        // swap turn
        swapTurn();
        // check win or not
        checkGameOver();
    }
}

boxes.forEach((box, index) =>{
    box.addEventListener("click", () => {
        handleClick(index);
    })
});


newGameBtn.addEventListener("click", initGame);