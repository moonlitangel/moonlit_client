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

	constructor(private SentenceService: SentenceService) { }

	add(model): void {
		this.SentenceService.createSentence(this.model)
			.then(() => {
				location.reload();
			})
	}

	changeString(model: Sentence) {
		this.model.complement = model.complement.toString().split(/\s*,\s|,/);
		this.model.verb = model.verb.toString().split(/\s*,\s|,/);
		this.model.subject = model.subject.toString().split(/\s*,\s|,/);
	}

	ngOnChanges() {
		this.model.step = this.step;
	}

}
