/*jshint esversion: 6 */

const queryString = location.search;
const params = new URLSearchParams(queryString);
const winner = params.get("winner");
console.log(winner);


var c = document.getElementById("canvas");
var cc = c.getContext("2d");

//array of gray colors - these are very similar colors, let's hope this works out well.
var items = ["#96ceb4", "#ffeead", "#ff6f69", "#ffcc5c", "#88d8b0"];

window.addEventListener("load", setDimensions);
window.addEventListener("resize", setDimensions);

setInterval(draw, 150);

function setDimensions() {
    c.width = window.innerWidth;
    c.height = window.innerHeight - 150;

    cc.font = "100px Georgia";
    cc.fillStyle = "#ffeead";
    strokeStyle = "black";
    cc.textAlign = "center";
    cc.fillText(winner, window.innerWidth / 2, window.innerHeight / 2 - 100);
    cc.fillText("WINS", window.innerWidth / 2, window.innerHeight / 2 + 50);
}

function draw() {


    for (x = 0; x < 5; x++) { //5 blocks at a time

        cc.fillStyle = items[Math.floor(Math.random() * items.length)]; // random color from array "items"

        cc.globalAlpha = 0.3; // semi-transparent blocks

        var size = Math.floor((Math.random()) * 40) + 1; //random square-size between 1 and 40px	

        cc.fillRect(Math.floor(Math.random() * c.width - 20), Math.floor(Math.random() * c.height - 20), size, size); //random location & random size!	



    }
}