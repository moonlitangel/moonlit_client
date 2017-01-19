import { Component, OnInit } from '@angular/core';

import { Sentence } from './../sentence';
import { SentenceService } from './../sentence.service';

@Component({
	selector: 'app-sentence-table',
	templateUrl: './sentence-table.component.html',
	styleUrls: ['./sentence-table.component.scss']
})
export class SentenceTableComponent implements OnInit {
	results: Sentence[];
	model = new Sentence;
	getData = '';
	addData = false;

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

	ngOnInit() {
		this.getAllSentence();
	}
}
