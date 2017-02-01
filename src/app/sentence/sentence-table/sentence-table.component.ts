import { Component, Input, OnChanges, SimpleChange } from '@angular/core';

import { Sentence } from './../sentence';
import { SentenceService } from './../sentence.service';

@Component({
	selector: 'app-sentence-table',
	templateUrl: './sentence-table.component.html',
	styleUrls: ['./sentence-table.component.scss']
})
export class SentenceTableComponent implements OnChanges {
	results: Sentence[];
	model = new Sentence;
	getData = '';
	addData = false;
	@Input() step: number;
	getStep: false;

	constructor(private SentenceService: SentenceService) { }

	getAllSentence(): void {
		this.SentenceService.getAllSentence()
			.then(results => {
				this.results = results;
			})
	}

	getSentence(id: string): void {
		this.SentenceService.getSentence(id)
			.then(result => {
				this.getData = id;
				this.model = result;
			})
	}

	getStepSentence(step: number): void{
		this.SentenceService.getStepSentence(step)
			.then(results => {
				this.results = results;
			})
	}

	updateSentence(Sentence: Sentence): void {
		this.SentenceService.updateSentence(this.model)
			.then(() => {
				this.getData = '';
				this.getAllSentence();
			})
	}

	changeString(model: Sentence) {
		this.model.complement = model.complement.toString().split(/\s*,\s*|,/);
		this.model.verb = model.verb.toString().split(/\s*,\s*|,/);
		this.model.subject = model.subject.toString().split(/\s*,\s*|,/);
		console.log(this.model);
	}

	deleteSentence(Sentence: Sentence): void {
		this.SentenceService.deleteSentence(Sentence._id)
			.then(() => {
				this.results = this.results.filter(h => h !== Sentence);
			})
	}

	addSentence() {
		this.addData = true;
	}

	ngOnChanges() {
		if(this.step === 0) {
			this.getAllSentence();
		}	else {
			this.getStepSentence(this.step);
		}
	}
}
