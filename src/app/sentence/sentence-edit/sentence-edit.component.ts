import { Component, Input, OnChanges, SimpleChange } from '@angular/core';

import { Sentence } from './../sentence';
import { SentenceService } from './../sentence.service';

@Component({
	selector: 'app-sentence-edit',
	templateUrl: './sentence-edit.component.html',
	styleUrls: ['./sentence-edit.component.scss']
})
export class SentenceEditComponent implements OnChanges {
	model = new Sentence;
	@Input() step: number;
	getStep = 0;

	constructor(private SentenceService: SentenceService) { }

	add(model): void {
		this.SentenceService.createSentence(this.model)
			.then(() => {
				location.reload();
			})
	}

	changeStep(step) {
		this.getStep = step;
	}

	changeString(model: Sentence) {
		if(model.complement) this.model.complement = model.complement.toString().split(/\s*,\s|,/);
		if(model.verb) this.model.verb = model.verb.toString().split(/\s*,\s|,/);
		if(model.subject) this.model.subject = model.subject.toString().split(/\s*,\s|,/);
		if(model.object) this.model.object = model.object.toString().split(/\s*,\s|,/);
		if(model.post1) this.model.post1 = model.post1.toString().split(/\s*,\s|,/);
		if(model.post2) this.model.post2 = model.post2.toString().split(/\s*,\s|,/);
	}

	ngOnChanges() {
		this.model.step = this.step;
	}

}
