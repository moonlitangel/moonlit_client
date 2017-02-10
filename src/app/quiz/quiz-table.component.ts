import { Component, Input, OnChanges, SimpleChange } from '@angular/core';
import { Router } from '@angular/router';

import { FileUploader } from 'ng2-file-upload/ng2-file-upload';

import { QuizService } from './quiz.service';
import { AdService } from './../adsetting/ad.service';

import { Quiz } from './quiz';
import { Ad } from './../adsetting/ad';

const URL = 'http://52.175.147.246:3000/upload';

@Component({
	selector: 'app-quiz-table',
	templateUrl: './quiz-table.component.html',
	styleUrls: ['./quiz-table.component.scss'],
	providers: [AdService]
})

export class QuizTableComponent implements OnChanges {
	results: Quiz[];
	adResults: Ad[];
	model: Quiz;
	change1: Quiz;
	change2: Quiz;
	getData = '';
	addData = false;
	adText: string = 'Not found';
	getAd: number = -1;
	@Input() category: string;
	getCategory = false;
	modifyPro = false;
	public uploader: FileUploader = new FileUploader({ url: URL });
	private uploadResult: any = null;
	getImg = true;
	imgurl = 'http://52.175.147.246:3000/imgs/';

	constructor(
		private QuizService: QuizService,
		private AdService: AdService
		) { 
			this.uploader.onSuccessItem = (item, response, status, headers) => {
				this.uploadResult = {
					"success": true, "item": item, "response":
						response, "status": status, "headers": headers
				};
			};
			this.uploader.onErrorItem = (item, response, status, headers) => {
				this.uploadResult = {
					"success": false, "item": item,
					"response": response, "status": status, "headers": headers
				};
			};
			this.uploader.onCompleteAll = () => {
				this.handleUploadComplete();
			};
		}

	getAllAd(): void{
		this.AdService.getAllAd()
			.then(results => this.adResults = results)
	}

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

	choiceAd(ad: any, quiz: any): void{
		var r = confirm("이 광고를 추가하시겠습니까?");
		if(r === true) {
			ad.quiz = quiz._id;
			quiz.ad = true;
			ad.quizinfo = quiz.smallcat + ' / ' + quiz.name;
			this.AdService.updateAd(ad)
				.then(() => {
					this.QuizService.updateQuiz(quiz)
						.then(() => {
							this.getAd = -1;
							this.getAllQuiz(quiz.smallcat);
						});
				});
			console.log("추가합니다", ad, quiz);
		} else {
			console.log("취소");
		}
	}

	closeSubmit(): void{
		this.getData = '';
		this.getImg = true;
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

	addAd(num: number) {
		this.getAd = num;
		this.getAllAd();
	}

	deleteAd(Quiz: Quiz): void {
		var r = confirm("광고를 제거하시겠습니까?")
		if(r === true) {
			Quiz.ad = false;
			this.QuizService.updateQuiz(Quiz)
				.then(() => {
					this.AdService.getQuizAd(Quiz._id)
						.then(results => {
							results.quiz = 'Not found';
							results.quizinfo = '';
							this.AdService.updateAd(results);
						})
					this.getAllQuiz(Quiz.smallcat);
				});
		} else {
			console.log("취소");
		}
	}

	updatePriority(): void {
		this.QuizService.updateQuiz(this.change1)
			.then(() => {
				this.QuizService.updateQuiz(this.change2);
			})
	}

	upPro(pro: number) {
		this.change1 = this.results[pro];
		this.change2 = this.results[pro-1];
		var tempPro1 = this.change1.priority;
		var tempPro2 = this.change2.priority;
		this.change1.priority = tempPro2;
		this.change2.priority = tempPro1;
		var temp = this.results[pro];
		this.updatePriority();
		this.results[pro] = this.results[pro-1];
		this.results[pro-1] = temp;
	}

	downPro(pro: number) {
		this.change1 = this.results[pro];
		this.change2 = this.results[pro+1];
		var tempPro1 = this.change1.priority;
		var tempPro2 = this.change2.priority;
		this.change1.priority = tempPro2;
		this.change2.priority = tempPro1;
		var temp = this.results[pro];
		this.updatePriority();
		this.results[pro] = this.results[pro+1];
		this.results[pro+1] = temp;
	}

	modifypro() {
		this.modifyPro = true;
	}

	exitpro() {
		this.modifyPro = false;
	}

	changeImg() {
		this.getImg = false;
	}

	private handleUploadComplete() {
		console.log("upload compete : " + this.uploadResult.response);
		if (this.uploadResult.success) {
			console.log('성공');
			this.imgurl = this.imgurl + this.uploadResult.response;
			this.getImg = true;
			this.model.img = this.uploadResult.response;
		} else {
			console.log('실패');
		}
	}

	uploadFile() {
		this.uploader.uploadAll(); // 업로드 시작
	}

	ngOnChanges() {
		this.getAllQuiz(this.category);
	}
}
