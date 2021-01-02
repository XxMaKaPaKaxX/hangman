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

  constructor({ lettersWrapper, categoryWrapper, wordWrapper, outputWrapper }) {
    this.lettersWrapper = lettersWrapper;
    this.categoryWrapper = categoryWrapper;
    this.wordWrapper = wordWrapper;
    this.outputWrapper = outputWrapper;

    const { text, category } = this.quotes[
      Math.floor(Math.random() * this.quotes.length)
    ];
    this.categoryWrapper.textContent = category;
    this.quote = new Quote(text);
    /* console.log(this.quote) */
  }

  guess = (letter, event) => {

    event.target.disabled = true;
    this.quote.guess(letter);
    this.drawQuote();
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
  lettersWrapper: document.getElementById("letters"),
  categoryWrapper: document.getElementById("category"),
  wordWrapper: document.getElementById("word"),
  outputWrapper: document.getElementById("output"),
});

game.start();
