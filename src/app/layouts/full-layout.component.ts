import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { QuizCategory } from './../quiz/quiz-category/quiz-category';
import { QuizService } from './../quiz/quiz.service';
import { AuthService } from './../pages/auth.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './full-layout.component.html',
	providers: [QuizService],
	styles: ['.logout { margin-right: 20px }']
})
export class FullLayoutComponent implements OnInit {
	categores: QuizCategory[];
	bigCategory = [];

	constructor(
		private QuizService: QuizService,
		private route: ActivatedRoute,
		private router: Router,
		private AuthService: AuthService) { }

	getCategory(): void {
		this.QuizService
			.getCategory()
			.then(results => {
				this.categores = results;
				for (let i = 0; i < this.categores.length; i++) {
					this.makeDisableDate(this.bigCategory, this.categores[i].name);
				}
			})
	}

	logout() {
		this.AuthService.logout();
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
