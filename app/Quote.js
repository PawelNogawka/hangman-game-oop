export class Quote {
  constructor(text) {
    this.text = text;
    this.guessed = [];
  }

  guess(letter) {
    if (!this.text.includes(letter)) {
      return false;
    }

    this.guessed.push(letter);
    return true;
  }

  getQuote() {
    let content = "";
    for (const char of this.text) {
      if (char == " " || this.guessed.includes(char)) {
        content += char;
      } else {
        content += "_";
      }
    }
    return content;
  }
}
