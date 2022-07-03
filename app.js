const divButtons = document.querySelector(".container-buttons");
const scorePlayerOne = document.querySelector(".score-player1");
const scorePlayerTwo = document.querySelector(".score-player2");
const scoreSelect = document.querySelector("#game-mode");
let scoreGoal = 0;

/* Announce the winner and deactivate player's buttons until Reset button is pressed */
function gameOver(player) {
  /* If true, playerOne won */
  if (player.className === "score-player1") {
    scorePlayerOne.classList.toggle("player-win");
    scorePlayerTwo.classList.toggle("player-lose");
    /* If false, playerTwo won */
  } else {
    scorePlayerTwo.classList.toggle("player-win");
    scorePlayerOne.classList.toggle("player-lose");
  }

  /* Deactivate player's buttons and the possibility to choose a win condition */
  divButtons.children[0].disabled = true;
  divButtons.children[1].disabled = true;
  scoreSelect.disabled = true;
  console.log(`Les boutons des joueurs ont été désactivés!`);
}

function resetGame() {
  scoreSelect.options.selectedIndex = 0;
  scorePlayerOne.classList.remove("player-win", "player-lose");
  scorePlayerTwo.classList.remove("player-win", "player-lose");
  scorePlayerOne.textContent = "0";
  scorePlayerTwo.textContent = "0";
  divButtons.children[0].disabled = false;
  divButtons.children[1].disabled = false;
  scoreSelect.disabled = false;
  scoreGoal = 0;
  console.log(`La fonction resetGame() a bien été appelé.`);
}

/* Check if a player has reach the number of points needed to win */
function checkScore(player, scorePlayer) {
  if (scorePlayer >= scoreGoal) {
    console.dir(player);
    console.log(`Le vainqueur est: ${player.className}`);
    gameOver(player);
  }
}

/* Increment the score passed in argument */
function incrementScore(scorePlayer) {
  const totalPlayerOne = parseInt(scorePlayer.textContent) + 1;
  scorePlayer.textContent = totalPlayerOne.toString();
  checkScore(scorePlayer, totalPlayerOne);
}

divButtons.addEventListener("click", (evt) => {
  const targetId = evt.target.id;
  switch (targetId) {
    case "btn-player1":
      incrementScore(scorePlayerOne);
      break;
    case "btn-player2":
      incrementScore(scorePlayerTwo);
      break;
    case "reset":
      resetGame();
      break;
  }
});

scoreSelect.addEventListener("change", () => {
  const indexOption = scoreSelect.options.selectedIndex;
  const indexValue = parseInt(scoreSelect[indexOption].textContent, 10);
  scoreGoal = indexValue;
});
