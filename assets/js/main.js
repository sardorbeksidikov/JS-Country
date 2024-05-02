// dark-mode
let loader = document.querySelectorAll(".loadering");

let modeBtn = document.getElementById("mode-btn");
modeBtn.addEventListener("click", function () {
  if (document.body.className != "dark") {
    this.firstElementChild.src = "./assets/images/light.svg";
  } else {
    this.firstElementChild.src = "./assets/images/dark.svg";
  }
  document.body.classList.toggle("dark");
});

