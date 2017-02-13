import { Component, Input, OnChanges } from '@angular/core';

import { Topik } from './../topik';
import { SentenceService } from './../sentence.service';

@Component({
	selector: 'app-topik-table',
	styles: ['.answer { font-weight: bold}'],
	templateUrl: './topik-table.component.html'
})
export class TopikTableComponent implements OnChanges {
	results: Topik[];
	model = new Topik;
	getData = '';
	addData = false;
	@Input() time: any;

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
			.catch(() => this.getAllTopik())
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

	confirmDelete(Topik: Topik) :void {
		var r = confirm("삭제하시겠습니까?");
		if(r === true) {
			this.deleteTopik(Topik);
			console.log("삭제", Topik);
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

	ngOnChanges() {
		this.getTopik(this.time);
	}
}
