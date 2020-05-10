/*jshint esversion: 6 */

const queryString = location.search;
const params = new URLSearchParams(queryString);
const player1 = params.get("player1");
const player2 = params.get("player2");


const startMessage =
    "<b> Rules: </b> First to choose starts witch green, number two starts with blue. Light yellow squares are either shortcuts or traps. Roll the dice to start the game..";
message.innerHTML = startMessage;


var winner = false;

rollDice = () => {

    if (winner) {
        return true;
    }

    //dice
    const max = 6;
    const roll = Math.ceil(Math.random() * max);
    const dice = document.getElementById("dice");
    dice.innerHTML = roll;

    // new position
    let currentPlayer = players[currentPlayerTurn];
    currentPlayer.position += roll;

    // new position message standard
    message.innerHTML = [currentPlayer.name + " landed safely on square <b>" + currentPlayer.position] + "</b>";
    trapMessage.innerHTML = [""];

    // if trap message 
    traps.forEach(trap => {
        if (trap.start === currentPlayer.position) {
            message.innerHTML = [""];
            trapMessage.innerHTML = [currentPlayer.name + " landed on square <b>" + currentPlayer.position + "</b>" + ".. But stepped on something! " + "<br>" + trap.message + "<br>" + " New position: square <b>" + trap.end] + "</b>";
            currentPlayer.position = trap.end;
        }
    });
    // player wins 
    if (currentPlayer.position >= endPosition) {
        winner = true;
        window.location.href = `gameover.html?winner=${currentPlayer.name}`;
    }

    // next round
    currentPlayerTurn++;
    if (currentPlayerTurn === players.length) {
        currentPlayerTurn = 0;

    }

    renderBoard();

};

// traps
const traps = [{
    start: 3,
    end: 9,
    message: "It's a shortcut over the mountains - move ahead!",
}, {
    start: 14,
    end: 8,
    message: "Ambush!! Fall back!",
}, {
    start: 12,
    end: 18,
    message: "well well well - over there - a shortcut trough Winterfell!",
}, {
    start: 23,
    end: 11,
    message: "Whitewalkers! run and hide quickly!",
}, {
    start: 15,
    end: 21,
    message: "..Look right over there! A dragon to ride - move ahead!",
}, ];


// players
let players = [{
    id: 0,
    name: player1,
    position: 0,
    color: "green"

}, {
    id: 1,
    name: player2,
    position: 0,
    color: "blue"
}];

let currentPlayerTurn = 0;

//board size
const width = 6;
const height = 4;
const board = [];
let position = +1;
let endPosition = 30;

for (var y = height; y >= 0; y--) {
    let row = [];

    board.push(row);
    for (var x = 0; x < width; x++) {
        row.push({
            x,
            y,
            position,
        });

        position++;

    }
}
// Render board, style square distance and square sizes
const boardSizeConst = 110;
const renderBoard = () => {
    let boardHTML = "";

    board.forEach(row => {
        row.forEach(square => {

            {
                boardHTML += `<div class=square style="top:${square.y * boardSizeConst}px; left:${square.x * boardSizeConst}px;">${square.position}</div>`;
            }

        });
    });

    traps.forEach(traps => {
        board.forEach(row => {
            row.forEach(square => {
                if (square.position === traps.start) {
                    boardHTML += `<div class=trap style="top:${square.y * boardSizeConst}px; left:${square.x * boardSizeConst}px;">${square.position}</div>`;
                }

            });
        });
    });

    // Player style
    players.forEach(player => {
        board.forEach(row => {
            row.forEach(square => {
                if (square.position === player.position) {
                    boardHTML += `<div class=player style="top:${square.y * boardSizeConst + 10}px; left:${square.x * boardSizeConst + 10}px;background-color:${player.color}"></div>`;
                }
            });
        });
    });


    document.getElementById("board").innerHTML = boardHTML;
};

renderBoard();