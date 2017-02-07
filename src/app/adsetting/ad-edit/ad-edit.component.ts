import { Component, OnChanges, Input } from '@angular/core';

import { FileUploader } from 'ng2-file-upload/ng2-file-upload';

import { Ad } from './../ad';
import { AdService } from './../ad.service'

const URL = 'http://52.175.147.246:3000/upload';

@Component({
	selector: 'app-ad-edit',
	templateUrl: './ad-edit.component.html',
	styleUrls: ['./ad-edit.component.scss']
})

export class AdEditComponent implements OnChanges {
	model = new Ad;
	public uploader: FileUploader = new FileUploader({ url: URL });
	private uploadResult: any = null;
	getImg = false;
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

	add(model): void {
		this.AdService.createAd(this.model)
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
	}

}
