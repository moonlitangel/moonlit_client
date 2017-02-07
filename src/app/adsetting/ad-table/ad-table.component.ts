import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import 'rxjs/add/operator/switchMap';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { Ad } from './../ad';
import { AdService } from './../ad.service';

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

	constructor(private AdService: AdService) { }

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

	ngOnInit() {
		this.getAllAd();
	}
}
