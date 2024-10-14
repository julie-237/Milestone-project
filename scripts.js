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
}

formElement.addEventListener("submit", getPlayerName);
