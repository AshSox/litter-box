function setHighScores()  {
    //get the saved score+initial pairs from local storage, or return an empty array if none saved
    var getHighScores = JSON.parse(window.localStorage.getItem('savedHighScores')) || [];

    //sort scores from largest to smallest
    getHighScores.sort(function (x, y) {
        return y.score - x.score;
    });

    //display each score + initial as a list item (+= to modify structure itself )
    for (var i = 0; i < getHighScores.length; i += 1) {
        var scoreItems = document.createElement('li');
        scoreItems.textContent = getHighScores[i].initials + ' - ' + getHighScores[i].score;

        //display in high score section by appending the li tags inside the ol w id allscores
        var allScores = document.getElementById('allscores');
        allScores.appendChild(scoreItems);

    }
}

//when page loads run function to render scores+initials 
setHighScores();