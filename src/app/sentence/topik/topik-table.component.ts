import { Component, OnInit } from '@angular/core';

import { Topik } from './../topik';
import { SentenceService } from './../sentence.service';

@Component({
	selector: 'app-topik-table',
	templateUrl: './topik-table.component.html'
})
export class TopikTableComponent implements OnInit {
	results: Topik[];
	model = new Topik;
	getData = '';
	addData = false;

	constructor(private SentenceService: SentenceService) { }

	calendarOptions = {
    autoApply: true,
		initialDate: new Date()
  };

	getAllTopik(): void {
		this.SentenceService.getAllTopik()
			.then(results => {
				this.results = results;
			})
	}

  getTopik(time: Date): void {
		this.SentenceService.getTopik(time)
			.then(results => {
				this.results = results;
			})
	}

	getOneTopik(id: string): void {
		this.SentenceService.getOneTopik(id)
			.then(result => {
				this.getData = id;
				this.model = result;
				this.calendarOptions.initialDate = new Date(result.time);
			})
	}

	updateTopik(Topik: Topik): void {
		this.SentenceService.updateTopik(this.model)
			.then(() => {
				this.getData = '';
				this.getAllTopik();
			})
	}

	changeString(model) {
		this.model.answer = model.answer.toString().split(/\s*,\s*|,/);
		this.model.time = model.time.formatted;
	}

	deleteTopik(Topik: Topik): void {
		this.SentenceService.deleteTopik(Topik._id)
			.then(() => {
				this.results = this.results.filter(h => h !== Topik);
			})
	}

	addTopik() {
		this.addData = true;
	}

	ngOnInit() {
		this.getAllTopik();
	}
}
