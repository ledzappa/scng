import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  	title = 'scng';
  	words: string[] = [];

  	// 0 = consonant, 1 = vowel
  	patterns: string[] = [
  		'1011', // ikea
  		'0110', // saab
  		'1001', // assa
  		'01001', // kivra
  		'001001' // klarna
  	];

  	pIndex = 0;
  	noRepeat = 'false';
  	numOfWords = 100;
  	
  	consonants: string[] = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z'];
    vowels: string[] = ['a', 'e', 'i', 'o', 'u', 'y'];

  	ngOnInit() {

  	}

  	randomize(pIndex: number, numOfWords: number, noRepeat: boolean) {
  		// console.log(this.pIndex);
  		// console.log(this.noRepeat);
  		// console.log('pIndex: ' + pIndex);
  		// console.log('numOfWords: ' + numOfWords);
  		this.words = [];
        let word = '';

        let i = 0;
        while (i < this.numOfWords) {
        	word = '';
        	let j = 0;
	        while (j < this.patterns[this.pIndex].length) {
	        	let letter = '';
	        	if (this.patterns[this.pIndex].charAt(j) == '0') {
	        		letter = this.consonants[Math.floor(Math.random() * this.consonants.length)];
	        	} else {
	        		letter = this.vowels[Math.floor(Math.random() * this.vowels.length)];
	        	}

	        	if (this.noRepeat === 'true') {
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
            	i++;
            }
        }

        console.log(this.words);
  	}
}
