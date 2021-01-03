import { Quote } from "./Quote.js";

class Game {
  quotes = [
    {
      text: "pan tadeusz",
      category: "Utwór literacki",
    },
    {
      text: "janko muzykant",
      category: "Utwór literacki",
    },
    {
      text: "akademia pana kleksa",
      category: "Film",
    },
    {
      text: "ogniem i mieczem",
      category: "Film",
    },
  ];

  constructor({
    gameStatusWrapper,
    lettersWrapper,
    categoryWrapper,
    wordWrapper,
    outputWrapper,
    stepImages,
  }) {
    this.gameStatusWrapper = gameStatusWrapper;
    this.lettersWrapper = lettersWrapper;
    this.categoryWrapper = categoryWrapper;
    this.wordWrapper = wordWrapper;
    this.outputWrapper = outputWrapper;
    this.stepImages = stepImages;
    this.gameStages = [...this.stepImages].length - 1;
    this.stage = 0;
    console.log(this.gameStages, this.stage);

    let { text, category } = this.quotes[
      Math.floor(Math.random() * this.quotes.length)
    ];
    this.categoryWrapper.textContent = category;
    this.quote = new Quote(text);
  }

  blockAllButtons = () => {
    const buttons = [...document.querySelectorAll("#letters button")];
    buttons.forEach((button) => {
      button.disabled = true;
    });
  };

  unBlockAllButtons = () => {
    const buttons = [...document.querySelectorAll("#letters button")];
    buttons.forEach((button) => {
      button.disabled = false;
    });
  };

  restart = (event) => {
    this.unBlockAllButtons();
    this.stage = 0;

    let { text, category } = this.quotes[
      Math.floor(Math.random() * this.quotes.length)
    ];
    this.categoryWrapper.textContent = category;
    this.quote = new Quote(text);
    this.drawQuote();
    this.changeStageImage(this.stepImages, this.stage);
    this.gameStatusWrapper.textContent = "";
    event.target.remove();
  };

  addRestartButton = () => {
    const restartButton = document.createElement("button");
    restartButton.textContent = "restart";
    restartButton.addEventListener("click", (event) => this.restart(event));
    this.gameStatusWrapper.append(restartButton);
  };

  checkTheGameStatus = () => {
    if (this.stage >= this.gameStages) {
      this.gameStatusWrapper.textContent = "Przegrałeś. Spróbuj ponownie!";
      this.addRestartButton();
      this.blockAllButtons();
    } else if (!this.quote.getContent().includes("_")) {
      this.gameStatusWrapper.textContent = "Wygrałeś. Gratulacje!";
      this.addRestartButton();
      this.blockAllButtons();
    }
  };

  changeStageImage = (images, actualStage) => {
    images.forEach((image) => {
      image.classList.remove("active");
    });
    images[actualStage].classList.add("active");
  };

  guess = (letter, event) => {
    event.target.disabled = true;
    if (!this.quote.guess(letter)) {
      this.stage += 1;
      console.log(this.stage);
      this.changeStageImage(this.stepImages, this.stage);
    }
    this.drawQuote();

    this.checkTheGameStatus();
  };

  drawLetters = () => {
    const alphabet = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
    ];
    alphabet.forEach((letter) => {
      const button = document.createElement("button");
      button.textContent = letter;
      button.addEventListener("click", (event) => this.guess(letter, event));
      this.lettersWrapper.append(button);
    });
  };

  drawQuote = () => {
    const content = this.quote.getContent();
    this.wordWrapper.textContent = content;
  };

  start() {
    this.drawLetters();
    this.drawQuote();
  }
}

const game = new Game({
  gameStatusWrapper: document.getElementById("gameStatus"),
  lettersWrapper: document.getElementById("letters"),
  categoryWrapper: document.getElementById("category"),
  wordWrapper: document.getElementById("word"),
  outputWrapper: document.getElementById("output"),
  stepImages: document.querySelectorAll(".step"),
});

game.start();
