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
    '1011', // ikea
    '0110', // saab
    '1001', // assa
    '01001', // kivra
    '001001' // klarna
  ];

  error: string = '';
  pIndex = 0;
  noRepeat = true;
  numOfWords = 100;
  startingPoint = '';
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
    console.log('start');
    // console.log(this.pIndex);
    // console.log(this.noRepeat);
    // console.log('pIndex: ' + pIndex);
    // console.log('numOfWords: ' + numOfWords);
    this.error = '';
    this.words = [];
    this.wordsGenerated = 0;
    let failedAttempts = 0;
    let word = '';

    let i = 0;
    while (i < this.numOfWords && failedAttempts < 1000) {
      let timeoutHandle = setTimeout(() => {
        return false;
      }, 5000);

      if (this.startingPoint.length > 0) {
        word = this.startingPoint;
      } else {
        word = '';
      }

      let j = 0;
      while (
        j <
        this.patterns[this.pIndex].length - this.startingPoint.length
      ) {
        let letter = '';
        if (
          this.patterns[this.pIndex].charAt(j + this.startingPoint.length) ==
          '0'
        ) {
          letter = this.consonants[
            Math.floor(Math.random() * this.consonants.length)
          ];
        } else {
          letter = this.vowels[Math.floor(Math.random() * this.vowels.length)];
        }

        if (this.noRepeat) {
          if (word.indexOf(letter) === -1) {
            word += letter;
            j++;
          }
        } else {
          word += letter;
          j++;
        }
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

    if (failedAttempts == 1000) {
      this.error =
        'Whops! Ran out of words :( (' + this.words.length + ' generated)';
    }
    console.log('end');
  }
}
