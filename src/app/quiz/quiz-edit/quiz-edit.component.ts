import { Component, OnChanges, Input } from '@angular/core';

import { FileUploader } from 'ng2-file-upload/ng2-file-upload';

import { Quiz } from './../quiz';
import { QuizService } from './../quiz.service'

const URL = 'http://52.175.147.246:3000/upload';

@Component({
	selector: 'app-quiz-edit',
	templateUrl: './quiz-edit.component.html',
	styleUrls: ['./quiz-edit.component.scss']
})

export class QuizEditComponent implements OnChanges {
	model = new Quiz;
	public uploader: FileUploader = new FileUploader({ url: URL });
	private uploadResult: any = null;
	getImg = false;
	imgurl = 'http://52.175.147.246:3000/imgs/';
	@Input() category: string;
	@Input() categoryId: string;

	constructor(private QuizService: QuizService) {
		this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };	//클라이언트에서의 credentials 문제였던것이였다...
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

	add(model): void {
		this.QuizService.createQuiz(this.model)
			.then(() => {
				location.reload();
			})
	}


	uploadFile() {
		this.uploader.uploadAll(); // 업로드 시작
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

	ngOnChanges() {
		this.model.smallcat = this.category;
		this.model.categoryId = this.categoryId;
	}

}
