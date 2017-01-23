import { Component, OnInit } from '@angular/core';

import { Topik } from './../topik';
import { SentenceService } from './../sentence.service';

@Component({
  selector: 'app-topik',
  templateUrl: './topik.component.html',
  styleUrls: ['./topik.component.scss']
})
export class TopikComponent implements OnInit {
  results: Topik[];
  date = '';

  calendarOptions = {
    autoApply: true,
    initialDate: new Date(),
    firstWeekdaySunday: false
  };

  constructor(private SentenceService: SentenceService) { }

  getTopik(time: Date): void {
		this.SentenceService.getTopik(time)
			.then(results => {
				console.log(results);
			})
	}

  loadData(date) :void {
    console.log(date);
    this.getTopik(date.formatted);
  }

  ngOnInit() {
  }

}
