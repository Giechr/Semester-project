/*jshint esversion: 6 */

var chr = document.getElementById("cards");

// Get JSON
$.getJSON("JSON/characters.json", function (json) {

    //Loop JSON
    for (i = 0; i < json.characters.length; i++) {

        //JSON => HTML
        chr.innerHTML +=
            '<div class=card><label>' +
            `<h2 class=name>${json.characters[i].Name}</h2>` +
            `<p class=title>${json.characters[i].Titles[0]}</p>` +
            `<p class=birth>Born ${json.characters[i].Born}</p>` +
            `<p class=aka>Also known as ${json.characters[i].Aliases[0]}</p>` +
            `<input type=checkbox  class=check value=\"${json.characters[i].Name}\"/></label>` +
            '</div>';

    }

    // Loop check-boxes and allow max 2 boxes checked.
    const checks = document.querySelectorAll(".check");
    var checksArr = Array.from(checks);

    for (let i = 0; i < checksArr.length; i++)
        checksArr[i].onclick = selectiveCheck;
    const max = 2;

    function selectiveCheck() {
        const checkedChecks = document.querySelectorAll(".check:checked");

        if (checkedChecks.length >= max + 1)
            return false;
    }

});

function getSelectedChbox(player) {
    var arrayOfPlayers = []; // array that store the value of selected checkboxes

    // gets all the input tags and their length
    var inp = player.getElementsByTagName('input');
    var nrInpfields = inp.length;

    // loop the inp elements, and adds the value of selected (checked) checkbox in arrayOfPlayers
    for (var i = 0; i < nrInpfields; i++) {

        if (inp[i].type == 'checkbox' && inp[i].checked == true) arrayOfPlayers.push(inp[i].value);
    }

    return arrayOfPlayers;
}

// When click , send the selected values
document.getElementById('btn').onclick = function () {

    let selPlayer = getSelectedChbox(this.form); // gets the array returned by getSelectedChbox()
    const player1 = selPlayer[0];
    const player2 = selPlayer[1];

    if (selPlayer.length === 2) {

        window.location.href = `game.html?player1=${player1}&player2=${player2}`;
    } else {
        document.getElementById("message").innerHTML = `<div class="alert alert-danger">WARNING! Select two players to proceed..</div>`;
    }

};