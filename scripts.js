const editPlayer1ButtonElement = document.getElementById("edit-player1");
const editPlayer2ButtonElement = document.getElementById("edit-player2");
const configurationPanelElement = document.getElementById("side-form");

let editedplayer = 0;
function OpenConfigurationPanel(event) {
  editedplayer = +event.target.dataset["playerId"]; // + to change value type from string to interger
  configurationPanelElement.style.display = "block";
}

editPlayer1ButtonElement.addEventListener("click", OpenConfigurationPanel);
editPlayer2ButtonElement.addEventListener("click", OpenConfigurationPanel);

const cancelButtonElement = document.getElementById("Cancel");

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

function showgameboard() {
  if (players[0].name === "" || players[1].name === "") {
    alert("Please set custom player names for both players!");
    return;
  }
  activePlayerNameElement.textContent = players[activePlayer].name;
  gameBoardElement.style.display = "block";
}

startNewGameBtn.addEventListener("click", showgameboard);

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
  if (event.target.tagName !== "LI") {
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
  console.log(winnerId);
  
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
