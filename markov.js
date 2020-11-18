/** Textual markov chain generator */

class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO
    const wordChains = {};
    const bigramChains = {};

    for (let i = 0; i < this.words.length; i++) {
      const word = this.words[i];
      let nextWord = '';
      let nextNextWord = '';
      let nextBigram = '';

      if (i + 1 < this.words.length) {
        nextWord = this.words[i + 1];
        nextBigram = word + ' ' + nextWord;
      } else {
        nextWord = null;
      }

      if (nextBigram && i + 2 < this.words.length) {
        nextNextWord = this.words[i + 2];
      } else {
        nextNextWord = null;
      }

      if (wordChains[word]) {
        wordChains[word].push(nextWord);
      } else {
        wordChains[word] = [nextWord];
      }

      if (nextBigram) {
        if (bigramChains[nextBigram]) {
          bigramChains[nextBigram].push(nextNextWord);
        } else {
          bigramChains[nextBigram] = [nextNextWord];
        }
      }
    }

    this.wordChains = wordChains;
    this.bigramChains = bigramChains;
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
    let randText = '';
    let count = 0;
    let lastWord = '';
    let nextWord = this.words[Math.floor(Math.random() * this.words.length)];

    while (nextWord[0].toUpperCase() !== nextWord[0]) {
      nextWord = this.words[Math.floor(Math.random() * this.words.length)];
    }

    while (nextWord && count < numWords) {
      randText += nextWord + ' ';
      count += 1;
      const bigram = lastWord + ' ' + nextWord;

      let nextList = [];
      if (this.bigramChains[bigram]) {
        nextList = this.bigramChains[bigram];
      } else {
        nextList = this.wordChains[nextWord];
      }

      lastWord = nextWord;
      nextWord = nextList[Math.floor(Math.random() * nextList.length)];
    }

    return randText.slice(0, -1);
  }
}

module.exports = { MarkovMachine };
