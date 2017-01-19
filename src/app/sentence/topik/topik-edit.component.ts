import { Component, OnInit } from '@angular/core';

import { Topik } from './../topik';
import { SentenceService } from './../sentence.service';

@Component({
	selector: 'app-topik-edit',
	templateUrl: './topik-edit.component.html',
	styles: [
		`.datepicker-container .datepicker-calendar {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    width: 250px;
    top: -200px;
    position: absolute;
    z-index: 99;
    background: #FFFFFF;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5); }`
		]
})
export class TopikEditComponent implements OnInit {
	model = new Topik;

	calendarOptions = {
    autoApply: true,
		initialDate: new Date(),
    firstWeekdaySunday: false
  };

	constructor(private SentenceService: SentenceService) { }

	add(model): void {
		this.SentenceService.createTopik(this.model)
			.then(() => {
				location.reload();
			})
	}

	changeString(model) {
		this.model.answer = model.answer.toString().split(/\s*,\s|,/);
		this.model.time = model.time.formatted;
	}

	ngOnInit() {
	}

}