import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import 'rxjs/add/operator/switchMap';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { QuizCategory } from './quiz-category';
import { QuizService } from './../quiz.service';

@Component({
	templateUrl: './new-category.component.html'
})
export class NewCategoryComponent implements OnInit {
  categores: QuizCategory[];
	bigCategory = [];
  model= new QuizCategory;
  addData = false;
  getData = '';

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private QuizService: QuizService
	) { }

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

  getSmallCategory(name: string): void {
    this.QuizService.getSmallCategory(name)
      .then(results => {
        this.model = results;
      })
  }

  add(model): void {
		this.QuizService.createCategory(this.model)
			.then(() => {
				location.reload();
			})
	}

  deleteCategory(QuizCategory: QuizCategory): void {
		this.QuizService
			.deleteCategory(QuizCategory.smallcat)
			.then(() => {
				this.categores = this.categores.filter(h => h !== QuizCategory);
			});
	}

	makeDisableDate(disableDay, val) {
		var dateIndex = disableDay.indexOf(val);
		if (dateIndex == -1) {
			disableDay.push(val);
		}
	}

  addCategory() {
		this.addData = true;
	}

	ngOnInit() {
    this.getCategory();
	}
}
