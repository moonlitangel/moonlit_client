import { Component, Input, OnChanges, SimpleChange } from '@angular/core';
import { Router } from '@angular/router';

import { QuizService } from './quiz.service';

import { Quiz } from './quiz';

@Component({
	selector: 'app-quiz-table',
	templateUrl: './quiz-table.component.html',
	styleUrls: ['./quiz-table.component.scss']
})

export class QuizTableComponent implements OnChanges {
	results: Quiz[];
	model: Quiz;
	change1: Quiz;
	change2: Quiz;
	getData = '';
	addData = false;
	@Input() category: string;
	getCategory = false;

	constructor(private QuizService: QuizService) { }

	getAllQuiz(smallcat: string): void {
		this.QuizService
			.getAllQuiz(smallcat)
			.then(results => this.results = results)
	}

	getQuiz(smallcat: string, id: string): void {
		this.QuizService
			.getQuiz(smallcat, id)
			.then(results => {
				this.getData = id;
				this.model = results;
			})
	}

	updateQuiz(Quiz: Quiz): void {
		this.QuizService
			.updateQuiz(this.model)
			.then(() => {
				this.getData = '';
				this.getAllQuiz(this.model.smallcat);
			})
	}

	confirmQuiz(Quiz: Quiz) :void {
		var r = confirm("삭제하시겠습니까?");
		if(r === true) {
			this.deleteQuiz(Quiz);
			console.log("삭제", Quiz);
		} else {
			console.log("취소");
		}
	}

	closeSubmit(): void{
		this.getData = '';
	}

	closeAdd(): void{
		this.addData = false;
	}

	deleteQuiz(Quiz: Quiz): void {
		this.QuizService
			.deleteQuiz(Quiz._id)
			.then(() => {
				this.results = this.results.filter(h => h !== Quiz);
			});
	}

	addQuiz() {
		this.addData = true;
	}

	ngOnChanges() {
		this.getAllQuiz(this.category);
	}
}
