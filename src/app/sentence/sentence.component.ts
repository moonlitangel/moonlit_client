import { Component, OnInit } from '@angular/core';

import { Progress } from './../share/progress';
import { DetailProgress } from './../share/detailprogress';
import { ProgressService } from './../share/progress.service';

@Component({
  selector: 'app-sentence',
  templateUrl: './sentence.component.html',
  styleUrls: ['./sentence.component.scss']
})
export class SentenceComponent implements OnInit {
  model = new Progress;
  progress = new DetailProgress;
  data = 0;

  constructor(private ProgressService: ProgressService) {
    this.model.user = localStorage.getItem('googleUser');
  }

  createUser(Progress: Progress): void{
    this.ProgressService.createProgress(this.model)
      .then(() => {
        console.log(this.model);
      })
  }

  getProgress(): void{
    this.ProgressService.getUserProgress(this.model.user)
      .then((results) => {
        this.model = results;
        console.log(results);
        this.data = 1;
      })
  }

  add(model): void {
		this.ProgressService.updateProgress(this.model)
			.then(() => {
        console.log("성공");
			})
	}

  progressPush(model): void {
    this.model.progress = [model];
    console.log(this.model);
  }

  ngOnInit() {
  }

}
