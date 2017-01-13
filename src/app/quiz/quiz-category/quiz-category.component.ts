import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import 'rxjs/add/operator/switchMap';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { QuizCategory } from './quiz-category';
import { QuizService } from './../quiz.service';

@Component({
  templateUrl: './quiz-category.component.html',
  styleUrls: ['./quiz-category.component.scss']
})
export class QuizCategoryComponent implements OnInit {
	categores: QuizCategory[];
	voted = false;
	category = 'asfj3#Fasgb';
	name = '';


  constructor(
		private route: ActivatedRoute,
    private router: Router,
		private QuizService: QuizService
	) { }

	getOneCategory(name: string): void {
		this.QuizService
			.getOneCategory(name)
			.then(results => this.categores = results)
	}
	testClick(category: string) {
		this.category = category;
		this.voted = true;
	}

  ngOnInit() {
		this.route.params
			.switchMap((params: Params) => this.name = params['name'] )
			.subscribe(() => this.getOneCategory(this.name));
  }
}
