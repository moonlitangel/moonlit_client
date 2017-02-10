import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import 'rxjs/add/operator/switchMap';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { FileUploader } from 'ng2-file-upload/ng2-file-upload';

import { Ad } from './../ad';
import { AdService } from './../ad.service';

const URL = 'http://52.175.147.246:3000/upload';

@Component({
	selector: 'app-ad-table',
	templateUrl: './ad-table.component.html',
	styleUrls: ['./ad-table.component.scss']
})
export class AdTableComponent implements OnInit {
	results: Ad[];
	model: Ad;
	getData = '';
	addData = false;
	public uploader: FileUploader = new FileUploader({ url: URL });
	private uploadResult: any = null;
	getImg = true;
	imgurl = 'http://52.175.147.246:3000/imgs/';

	constructor(private AdService: AdService) {
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

	getAllAd(): void {
		this.AdService
			.getAllAd()
			.then(results => this.results = results)
	}

	getAd(id: string): void {
		this.AdService
			.getAd(id)
			.then(results => {
				this.getData = id;
				this.model = results;
			})
	}

	getQuizAd(quiz: string): void {
		this.AdService
			.getQuizAd(quiz)
			.then(results => {
				this.model = results;
			})
	}

	updateAd(Ad: Ad): void {
		this.AdService
			.updateAd(this.model)
			.then(() => {
				this.getData = '';
				this.getAllAd();
			})
	}

	confirmDelete(Ad: Ad) :void {
		var r = confirm("삭제하시겠습니까?");
		if(r === true) {
			this.deleteAd(Ad);
			console.log("삭제", Ad);
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

	deleteAd(Ad: Ad): void {
		this.AdService
			.deleteAd(Ad._id)
			.then(() => {
				this.results = this.results.filter(h => h !== Ad);
			});
	}

	addAd() {
		this.addData = true;
	}

	changeImg() {
		this.getImg = false;
	}

	uploadFile() {
		this.uploader.uploadAll(); // 업로드 시작
	}

	ngOnInit() {
		this.getAllAd();
	}
}
