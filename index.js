const info = document.getElementById("info");
const body = document.getElementById("body");
const startButton = document.getElementById("startButton");
const inputDiv = document.getElementById("inputDiv");
const buttonsDiv = document.getElementById("buttonsDiv");

function startGame(){
    inputDiv.removeChild(startButton);

    let input = document.createElement("input");
    input.id = "input";
    input.type = "text";
    inputDiv.append(input);

    let submit = document.createElement("button");
    submit.id = "submit";
    submit.textContent = "Submit";
    inputDiv.append(submit);

    //document.body.append(document.createElement("br"));
    //document.body.append(document.createElement("br"));

    let lives = document.createElement("button");
    lives.id = "lives";
    lives.className = "buttons";
    buttonsDiv.append(lives);

    let hint = document.createElement("button");
    hint.id = "hint";
    hint.className = "buttons";
    buttonsDiv.append(hint);

    let restart = document.createElement("button");
    restart.id = "restart";
    restart.textContent = "Restart";
    restart.className = "buttons";
    restart.onclick = () => {guessNumber();}
    buttonsDiv.append(restart);

    guessNumber();
}

function guessNumber(){
    let endNums = generateEndNums();
    info.textContent = "Guess a number between " + endNums[0] + " and " + endNums[1] + ", inclusive.";
    let randomNum = generateRandomNum(endNums[0], endNums[1]);
    let numLives = 3;
    let numHints = 3;

    document.getElementById("submit").onclick = () => {if (--numLives === 0) gameOver();
                            console.log("number of lives: " + numLives);
                            verifyNum(endNums, randomNum) ;
                            document.getElementById("lives").textContent = "Lives: " + numLives; }

    document.getElementById("lives").textContent = "Lives: " + numLives;

    document.getElementById("hint").onclick = () => {numHints-- >= 0? giveHint(randomNum, numHints) : numHints = 0;
                                                        if (numHints >= 0) document.getElementById("hint").textContent = "Hints: " + (numHints); }
    document.getElementById("hint").textContent = "Hints: 3";

    console.log(randomNum);
}

function generateRandomNum(smallest, largest){
    let num = Math.round(Math.random() * (largest - smallest)) + smallest;
    return num;
}

function generateEndNums(){
    let num1 = Math.round(Math.random() * 500);
    let num2 = Math.round(Math.random() * 500);

    return [Math.min(num1, num2), Math.max(num1, num2)];
}

function verifyNum(endNums, randomNum){
    let guessedNum = document.getElementById("input").value;
    //console.log(endNums);

    try{
        guessedNum = Number(guessedNum);
        if (isNaN(guessedNum)){ throw new Error("Enter a valid prompt."); }
    }
    catch(error){
        console.error(error);
        return;
    }

    if (guessedNum != randomNum){
        if (guessedNum >= endNums[0] && guessedNum <= endNums[1]){
            console.log("Wrong, try again.");
        }
        else if (guessedNum < endNums[0]){
            console.log("Number must be greater than or equal to " + endNums[0]);
        }
        else if (guessedNum > endNums[1]){
            console.log("Number must be less than or equal to " + endNums[1]);
        }
    }
    else{
        console.log("Correct, you WON!!!");
    }
}

function gameOver(){
    console.log("Game over!!!");
}

function giveHint(randomNum, numHints){
    if (numHints >= 0){
        if (numHints === 2){
            let min = generateRandomNum(randomNum - 30, randomNum);
            let max = min + 30;

            console.log("Number is between " + min + " " + max + ", inclusive");
        }
        else if (numHints === 1){
            randomNum = randomNum.toString()
            console.log("Last digit of the number is " + randomNum.charAt(randomNum.length - 1));
        }
        else{
            randomNum = randomNum.toString()
            console.log("First digit of the number is " + randomNum.charAt(0));
        }
    }
}