let gameIsOver = false;
function resetGameStatus() {
  activePlayer = 0;
  currentRound = 1;
  gameIsOver = false;
  //gameOverElement.firstElementChild.innerHTML ='You won, <span id="winner-name">PLAYER NAME</span>!';
  gameOverElement.style.display = "none";
  let gameFieldIndex = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      gameData[i][j] = 0;
      const gameFieldElements = document.querySelectorAll("#Game-board li");
      const gameFieldItemElement = gameFieldElements[gameFieldIndex];
      gameFieldItemElement.textContent = "";
      gameFieldItemElement.classList.remove("disabled");
      gameFieldIndex++;
    }
  }
}

const editPlayer1ButtonElement = document.getElementById("edit-player1");
const editPlayer2ButtonElement = document.getElementById("edit-player2");
const configurationPanelElement = document.getElementById("side-form");
const editorMsgElement = document.querySelector("form h3")
let editedplayer = 0;
function OpenConfigurationPanel(event) {
  editedplayer = +event.target.dataset["playerId"]; // + to change value type from string to interger
  configurationPanelElement.style.display = "block";
  editorMsgElement.textContent = "Enter player" + editedplayer + " name"
}

editPlayer1ButtonElement.addEventListener("click", OpenConfigurationPanel);
editPlayer2ButtonElement.addEventListener("click", OpenConfigurationPanel);

const cancelButtonElement = document.getElementById("cancel");

function closeConfigurationPanel() {
  configurationPanelElement.style.display = "none";
  formElement.children[1].classList.remove("error");
  errorOutputElement.textContent = "";
  formElement.children[1].children[1].value = "";
}

cancelButtonElement.addEventListener("click", closeConfigurationPanel);

const formElement = document.querySelector("form");
const errorOutputElement = document.getElementById("warning");

const players = [
  {
    name: "",
    symbol: "X",
  },
  {
    name: "",
    symbol: "O",
  },
];

function getPlayerName(event) {
  event.preventDefault();
  const formdata = new FormData(event.target);
  const enteredPlayerName = formdata.get("user-name").trim();
  if (!enteredPlayerName) {
    errorOutputElement.textContent = "Please enter a valid name!";
    event.target.children[1].classList.add("error");
    return;
  }
  const updatedPlayerDataElement = document.getElementById(
    "player" + editedplayer + "-name"
  );
  updatedPlayerDataElement.textContent = enteredPlayerName;
  closeConfigurationPanel();

  if (editedplayer === 1) {
    players[0].name = enteredPlayerName;
  } else {
    players[1].name = enteredPlayerName;
  }

  // shorter way could be players[editedplayer -1].name = enteredPlayername
}

formElement.addEventListener("submit", getPlayerName);

const gameBoardElement = document.getElementById("Game");
const startNewGameBtn = document.getElementById("play");

const closeBtnElement = document.getElementById("close");
const closeBtncontainer = document.getElementById("close-Box");
const EditMsgElement = document.getElementById("verification")
function showgameboard() {
  if (players[0].name === "" || players[1].name === "") {
    closeBtnElement.style.display = "block"
    closeBtncontainer.style.display = "block"
    EditMsgElement.style.display = "block"
    return;
  }
  resetGameStatus();
  activePlayerNameElement.textContent = players[activePlayer].name;
  gameBoardElement.style.display = "block";
  shadowElement.style.display = "none";
  editPlayer1ButtonElement.style.display = "none";
  editPlayer2ButtonElement.style.display = "none";
}

startNewGameBtn.addEventListener("click", showgameboard);

function closeVerificationBox() {
  //closeBtnElement.style.display = "none"
  closeBtncontainer.style.display = "none"
    //EditMsgElement.style.display = "none"
}
closeBtnElement.addEventListener("click", closeVerificationBox)
//const gameFieldElements = document.querySelectorAll("#Game-board li");
const gameFieldElement = document.getElementById("Game-Board");

const gameData = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
let currentRound = 1;
let activePlayer = 0;
const activePlayerNameElement = document.getElementById("active-player-name");

function switchPlayer() {
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  activePlayerNameElement.textContent = players[activePlayer].name;
}

function selectgamefield(event) {
  if (event.target.tagName !== "LI" || gameIsOver === true) {
    return;
  }
  const selectfield = event.target;
  selectfield.textContent = players[activePlayer].symbol;
  selectfield.classList.add("disabled");

  const selectedColumn = selectfield.dataset.col - 1;
  const selectedrow = selectfield.dataset.row - 1;

  if (gameData[selectedColumn][selectedrow] > 0) {
    alert("Please select an empty field");
    return;
  }
  gameData[selectedColumn][selectedrow] = activePlayer + 1;
  console.log(gameData);

  const winnerId = checkForGameOver();
  if (winnerId !== 0) {
    endGame(winnerId);
  }

  currentRound++;
  switchPlayer();
}

//for (const gameFieldElement of gameFieldElements) {
// gameFieldElement.addEventListener("click", selectgamefield);
//}
gameBoardElement.addEventListener("click", selectgamefield);

function checkForGameOver() {
  // checking the rows for equality
  for (let i = 0; i < 3; i++) {
    if (
      gameData[i][0] > 0 &&
      gameData[i][0] === gameData[i][1] &&
      gameData[i][1] === gameData[i][2]
    ) {
      return gameData[i][0];
    }
  }

  // checking the columns for equality
  for (let i = 0; i < 3; i++) {
    if (
      gameData[0][i] > 0 &&
      gameData[0][i] === gameData[1][i] &&
      gameData[0][i] === gameData[2][i]
    ) {
      return gameData[0][i];
    }
  }

  // Diagonal: Top left to bottom right
  if (
    gameData[0][0] > 0 &&
    gameData[0][0] === gameData[1][1] &&
    gameData[1][1] === gameData[2][2]
  ) {
    return gameData[0][0];
  }

  // Diagonal: Bottom left to top right
  if (
    gameData[2][0] > 0 &&
    gameData[2][0] === gameData[1][1] &&
    gameData[1][1] === gameData[0][2]
  ) {
    return gameData[2][0];
  }
  if (currentRound === 9) {
    return -1;
  }
  return 0;
}

const gameOverElement = document.getElementById("game-over");
const winnerNameElement = document.getElementById("winner-name");
const shadowElement = document.getElementById("cover");

function endGame(winnerId) {
  editPlayer1ButtonElement.style.display = "flex";
  editPlayer2ButtonElement.style.display = "flex";
  gameIsOver = true;
  gameOverElement.style.display = "block";
  shadowElement.style.display = "block";
  if (winnerId > 0) {
    const winnerName = players[winnerId - 1].name;
    winnerNameElement.textContent = winnerName;
  } else {
    gameOverElement.firstElementChild.textContent = "It's a draw!";
  }
}
