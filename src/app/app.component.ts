import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  	title = 'scng';
  	words: string[] = [];

  	ngOnInit() {

  	}

  	randomize() {
  		this.words = [];
        let word = '';
        const consonants: string[] = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z'];
        const vowels: string[] = ['a', 'e', 'i', 'o', 'u', 'y'];

        // length = 5
        // pattern 1: kakaa // conea
        // pattern 2: kakka // kivra, volvo
        // pattern 3: 

        // length = 4
        // pattern 1: akaa // ikea
        // pattern 2: kaak // saab
        // pattern 3: akka // assa

        let i = 0;
        let pattern = 2;
        let wordLength = 5;
        while (i < 100) {
            let j = 0;
            word = '';

            while (j < wordLength) {
            	if (wordLength == 5) {
	                if (pattern == 1) {
	                    if (j == 0 || j == 2) {
	                        word += consonants[Math.floor(Math.random() * consonants.length)];
	                    } else {
	                        word += vowels[Math.floor(Math.random() * vowels.length)];
	                    }
	                } else if (pattern == 2) {
	                    if (j == 0 || j == 2 || j == 3) {
	                        word += consonants[Math.floor(Math.random() * consonants.length)];
	                    } else {
	                        word += vowels[Math.floor(Math.random() * vowels.length)];
	                    }
	                }
            	} else if (wordLength == 4) {

            	}
            	
                j++;
            }

            // push if doesnt already exist
            if (this.words.indexOf(word) === -1) {
            	this.words.push(word);
            	i++;
            }
        }
  	}
}
