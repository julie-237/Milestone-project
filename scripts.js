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
  gameBoardElement.style.display = "block";
}

startNewGameBtn.addEventListener("click", showgameboard);
