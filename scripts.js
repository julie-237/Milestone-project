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
  formElement.children[1].classList.remove("error")
  errorOutputElement.textContent = "";

}

cancelButtonElement.addEventListener("click", closeConfigurationPanel);

const formElement = document.querySelector("form");
const errorOutputElement = document.getElementById("warning");

function getPlayerName(event) {
  event.preventDefault();
  const formdata = new FormData(event.target);
  const enteredPlayerName = formdata.get("user-name").trim();
  if (!enteredPlayerName) {
    errorOutputElement.textContent = "Please enter a valid name!";
    event.target.children[1].classList.add("error")
    return;
  }
}

formElement.addEventListener("submit", getPlayerName);
