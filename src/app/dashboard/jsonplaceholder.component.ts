import { Component, OnInit } from '@angular/core';
import { JsonPlaceholder } from './jsonplaceholder';
import { JsonPlaceholderService } from './jsonplaceholder.service';

@Component({
  selector: 'app-post',
  templateUrl: './jsonplaceholder.component.html',
	styles: ['.text-right { float: right; }'],
	providers: [JsonPlaceholderService]
})
export class JsonPlaceholderComponent implements OnInit {
	results: JsonPlaceholder[];
	model: JsonPlaceholder;
	getData = '';
	addData = false;

  constructor(private JsonPlaceholderService: JsonPlaceholderService) { }
  
	getAll(): void {
		this.JsonPlaceholderService
		.getAll()
		.then(results => this.results = results)
	}

	getPost(smallcat: string, id: string): void {
		this.JsonPlaceholderService
		.getPost(smallcat, id)
		.then(results => {
			this.getData = id;
			this.model = results;
		})
	}

	update(JsonPlaceholder: JsonPlaceholder): void {
		this.JsonPlaceholderService
		.update(this.model)
		.then(() => {
			this.getData = '';
			this.getAll();
			//this.results.splice(this.model.id-1, 1, this.model);
		})
	}

	delete(JsonPlaceholder: JsonPlaceholder): void {
    this.JsonPlaceholderService
        .delete(JsonPlaceholder._id)
        .then(() => {
          this.results = this.results.filter(h => h !== JsonPlaceholder);
        });
  }

	addPost() {
		this.addData = true;
	}

	ngOnInit() {
    this.getAll();
  }	
}