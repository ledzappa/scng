import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'The Swedish company name generator';
  words: string[] = [];

  // 0 = consonant, 1 = vowel
  patterns: string[] = [
    'VCVV', // ikea
    'CVVC', // saab
    'VCCV', // assa
    'CVCCV', // kivra
    'CCVCCV' // klarna
  ];

  error = '';
  pIndex = 0;
  noRepeat = true;
  numOfWords = 100;
  customPattern = '';
  wordsGenerated = 0;

  consonants: string[] = [
    'b',
    'c',
    'd',
    'f',
    'g',
    'h',
    'j',
    'k',
    'l',
    'm',
    'n',
    'p',
    'q',
    'r',
    's',
    't',
    'v',
    'w',
    'x',
    'z'
  ];
  vowels: string[] = ['a', 'e', 'i', 'o', 'u', 'y'];

  ngOnInit() {}

  randomize() {
    this.error = '';
    this.words = [];
    this.wordsGenerated = 0;
    let failedAttempts = 0;
    let word = '';
    let pattern = '';

    if (this.customPattern.length > 0) {
      pattern = this.customPattern;
    } else {
      pattern = this.patterns[this.pIndex];
    }

    let i = 0;
    while (i < this.numOfWords && failedAttempts < 1000) {
      const timeoutHandle = setTimeout(() => {
        return false;
      }, 5000);

      word = '';

      let j = 0;
      while (j < pattern.length) {
        let letter = '';

        if (pattern.charAt(j) == 'C') {
          // generate consonant
          letter = this.consonants[
            Math.floor(Math.random() * this.consonants.length)
          ];
        } else if (pattern.charAt(j) == 'V') {
          // generate vowel
          letter = this.vowels[Math.floor(Math.random() * this.vowels.length)];
        } else if (pattern.charAt(j) === '*') {
          const a = [...this.vowels, ...this.consonants];
          letter = a[Math.floor(Math.random() * a.length)];
        } else {
          letter = pattern.charAt(j);
        }

        if (this.noRepeat) {
          if (word.indexOf(letter) === -1) {
            word += letter;
          }
        } else {
          word += letter;
        }
        j++;
      }

      // push if word hasn't already been generated
      if (this.words.indexOf(word) === -1) {
        this.words.push(word);
        failedAttempts = 0;
        i++;
      } else {
        failedAttempts++;
      }
    }

    if (failedAttempts === 1000) {
      this.error =
        'Whops! Ran out of words (' + this.words.length + ' words generated)';
    }
  }
}
