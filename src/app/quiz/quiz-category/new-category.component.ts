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
				this.getData = name;
        this.model = results;			
      })
  }

	updateCategory(QuizCategory: QuizCategory): void {
		this.QuizService
			.updateCategory(this.model)
			.then(() => {
				this.getData = '';
				this.getCategory();
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
			.deleteCategory(QuizCategory._id)
			.then(() => {
        console.log("성공");
				this.categores = this.categores.filter(h => h !== QuizCategory);
			});
	}

	makeDisableDate(disableDay, val) {
		var dateIndex = disableDay.indexOf(val);
		if (dateIndex == -1) {
			disableDay.push(val);
		}
	}

	confirmDelete(QuizCategory: QuizCategory) :void {
		var r = confirm("삭제하시겠습니까?");
		if(r === true) {
			this.deleteCategory(QuizCategory);
			console.log("삭제", QuizCategory);
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

  addCategory() {
		this.addData = true;
	}

	ngOnInit() {
    this.getCategory();
	}
}
