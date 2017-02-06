import { Component, Input, OnChanges, SimpleChange } from '@angular/core';

import 'rxjs/add/operator/toPromise';

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
	modifyPro = false;
	change1: Sentence;
	change2: Sentence;

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

	confirmDelete(Sentence: Sentence) :void {
		var r = confirm("삭제하시겠습니까?");
		if(r === true) {
			this.deleteSentence(Sentence);
			console.log("삭제", Sentence);
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

	updateSentence(Sentence: Sentence): void {
		this.SentenceService.updateSentence(this.model)
			.then(() => {
				this.getData = '';
				if(this.model.step === 0)	this.getAllSentence();
				if(this.model.step !== 0) this.getStepSentence(this.model.step);
			})
	}

	updatePriority(): void {
		this.SentenceService.updateSentence(this.change1)
			.then(() => {
				this.SentenceService.updateSentence(this.change2);
			})
	}

	changeString(model: Sentence) {
		if(model.complement) this.model.complement = model.complement.toString().split(/\s*,\s|,/);
		if(model.verb) this.model.verb = model.verb.toString().split(/\s*,\s|,/);
		if(model.subject) this.model.subject = model.subject.toString().split(/\s*,\s|,/);
		if(model.object) this.model.object = model.object.toString().split(/\s*,\s|,/);
		if(model.post1) this.model.post1 = model.post1.toString().split(/\s*,\s|,/);
		if(model.post2) this.model.post2 = model.post2.toString().split(/\s*,\s|,/);
	}

	deleteSentence(Sentence: Sentence): void {
		this.SentenceService.deleteSentence(Sentence._id)
			.then(() => {
				this.results = this.results.filter(h => h !== Sentence);
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
