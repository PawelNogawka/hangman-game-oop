import { Quote } from "./Quote.js";

class Game {
  currentStep = 0;
  lastStep = document.querySelectorAll(".step").length - 1;

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

  constructor({ outputWrapper, wordWrapper, categoryWrapper, lettersWrapper }) {
    this.outputWrapper = outputWrapper;
    this.wordWrapper = wordWrapper;
    this.categoryWrapper = categoryWrapper;
    this.lettersWrapper = lettersWrapper;

    const randomValue = Math.floor(Math.random() * this.quotes.length);
    const { text, category } = this.quotes[randomValue];
    this.categoryWrapper.innerHTML = category;
    this.quote = new Quote(text);
  }

  guess(e, letter) {
    e.disabled = true;
    if (this.quote.guess(letter)) {
      this.drawQuote();

    } else {
      this.currentStep++;
      document.querySelectorAll(".step")[this.currentStep].style.opacity = "1";
      if (this.currentStep == this.lastStep) {
        this.loosing();
      }
    }
  }

  winning(){
    document.querySelectorAll("button").forEach((btn) => (btn.disabled = true));
    this.wordWrapper.innerHTML = "congratulations ! you guessed the password"
  }

  loosing() {
    document.querySelectorAll("button").forEach((btn) => (btn.disabled = true));
    this.wordWrapper.innerHTML = "You Loose! Try again"
  }

  drawQuote() {
    const word = this.quote.getQuote();
    this.wordWrapper.innerHTML = word;

    if(!word.includes("_")){
      this.winning()
    }
  }

  drawLetters() {
    for (let i = 0; i < 26; i++) {
      const letter = (10 + i).toString(36);
      const btn = document.createElement("button");
      btn.innerHTML = letter;
      btn.addEventListener("click", (event) =>
        this.guess(event.target, letter)
      );
      this.lettersWrapper.appendChild(btn);
    }
  }

  start() {
    document.querySelectorAll(".step")[this.currentStep].style.opacity = "1";
    this.drawLetters();
    this.drawQuote();
  }
}

const game = new Game({
  outputWrapper: document.getElementById("output"),
  wordWrapper: document.getElementById("word"),
  categoryWrapper: document.getElementById("category"),
  lettersWrapper: document.getElementById("letters"),
});

game.start();
