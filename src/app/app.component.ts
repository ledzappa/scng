import { Component, OnInit } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { debounceTime, map, startWith, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'The Swedish company name generator';
  words: string[] = [];
  width$: Observable<any>;
  error = '';
  pIndex = 0;
  noRepeat = true;
  isSmallDevice = false;
  numOfWords = 100;
  pattern = '@#@@';
  wordsGenerated = 0;
  savedWords: string[] = [];

  presets = [
    {
      name: 'Ikea',
      value: '@#@@'
    },
    {
      name: 'Saab',
      value: '#@@#'
    },
    {
      name: 'Assa',
      value: '@##@'
    },
    {
      name: 'Kivra',
      value: '#@##@'
    },
    {
      name: 'Klarna',
      value: '##@##@'
    }
  ];

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

  ngOnInit() {
    fromEvent(window, 'resize').pipe(
      debounceTime(100),
      tap((event: any) => this.isSmallDevice = event.target.innerWidth < 576),
      startWith(window.innerWidth)
    ).subscribe();
  }

  saveWord(word: string) {
    if (this.savedWords.indexOf(word) === -1) {
      this.savedWords.push(word);
    }
  }

  removeWord(index: number) {
    this.savedWords.splice(index, 1);
  }

  randomize() {
    this.error = '';
    this.words = [];
    this.wordsGenerated = 0;
    let failedAttempts = 0;
    let word = '';

    let i = 0;
    while (i < this.numOfWords && failedAttempts < 1000) {
      const timeoutHandle = setTimeout(() => {
        return false;
      }, 5000);

      word = '';

      let j = 0;
      while (j < this.pattern.length) {
        let letter = '';

        if (this.pattern.charAt(j) === '#') {
          // random consonant
          letter = this.consonants[
            Math.floor(Math.random() * this.consonants.length)
          ];
        } else if (this.pattern.charAt(j) === '@') {
          // random vowel
          letter = this.vowels[Math.floor(Math.random() * this.vowels.length)];
        } else if (this.pattern.charAt(j) === '*') {
          // random letter
          const a = [...this.vowels, ...this.consonants];
          letter = a[Math.floor(Math.random() * a.length)];
        } else {
          // keep letter
          letter = this.pattern.charAt(j);
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

  shuffle() {
    const shuffledWords = [];
    let i = 0;
    while (i < 50) {
      const shuffledWord = this.shuffleString(this.pattern);
      if (shuffledWords.indexOf(shuffledWord) === -1) {
        shuffledWords.push(shuffledWord);
      }
      i++;
    }
    this.words = shuffledWords;
  }

  shuffleString(string: string) {
    let shuffledString = '';
    let randomChar = '';
    // set initialLength since we will mutate string and its length will change
    const initLength = string.length;

    for (let i = 0; i < initLength; i++) {
      // get random char from string
      randomChar = string.charAt(Math.floor(Math.random() * string.length));
      // append random char to string
      shuffledString += randomChar;
      // remove random char before next iteration
      string = string.replace(randomChar, '');
    }
    return shuffledString;
  }
}
