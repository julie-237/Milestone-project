const editPlayer1ButtonElement = document.getElementById("edit-player1");
const editPlayer2ButtonElement = document.getElementById("edit-player2");
const configurationPanelElement = document.getElementById("side-form");

function OpenConfigurationPanel() {
  configurationPanelElement.style.display = "block";
}

editPlayer1ButtonElement.addEventListener("click", OpenConfigurationPanel);
editPlayer2ButtonElement.addEventListener("click", OpenConfigurationPanel);

const cancelButtonElement = document.getElementById("Cancel");

function closeConfigurationPanel() {
  configurationPanelElement.style.display = "none";
}

cancelButtonElement.addEventListener("click", closeConfigurationPanel);

const formElement = document.querySelector("form");
function getPlayerName(event) {
  event.preventDefault();
  const formdata = new FormData(event.target);
  const enteredPlayerName = formdata.get("user-name");
  console.log(enteredPlayerName)
  // const inputElement = document.querySelector("input")
  //const playerNameElement = document.getElementById("edit-player1")
  // playerNameElement.textContent = inputElement.textContent
}

formElement.addEventListener("submit", getPlayerName);
