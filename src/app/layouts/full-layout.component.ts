import { Component, OnInit } from '@angular/core';

import { QuizCategory } from './../quiz/quiz-category/quiz-category';
import { QuizService } from './../quiz/quiz.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './full-layout.component.html',
	providers: [QuizService]
})
export class FullLayoutComponent implements OnInit {
	categores: QuizCategory[];
	bigCategory = [];

	constructor(private QuizService: QuizService) { }

	getCategory(): void {
		this.QuizService
			.getCategory()
			.then(results => {
				this.categores = results;
				for(let i=0;i<this.categores.length;i++) {
					this.makeDisableDate(this.bigCategory, this.categores[i].name);
				}
			})
	}

	makeDisableDate(disableDay, val) {
		var dateIndex = disableDay.indexOf(val);
		if (dateIndex == -1) {
			disableDay.push(val);
		}
	}

	

	ngOnInit(): void {
		this.getCategory();
	}
}
