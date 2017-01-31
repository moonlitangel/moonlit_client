import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Progress } from './progress';

@Injectable()
export class ProgressService {

	private headers = new Headers({ 'Content-Type': 'application/json' });
	private ProgressUrl = 'http://52.175.147.246:3000/api/progress';
	private ApiUrl = 'http://52.175.147.246:3000/api';

	constructor(private http: Http) { }
	getAllProgress(): Promise<Progress[]> {
		return this.http.get(this.ProgressUrl)
			.toPromise()
			.then(response => response.json() as Progress[])
			.catch(this.handleError);
	}

	getUserProgress(id: string): Promise<Progress> {
		const url = `${this.ProgressUrl}/${id}`;
		return this.http.get(url)
			.toPromise()
			.then(response => response.json() as Progress)
			.catch(this.handleError);
	}

  getCategoryProgress(id: string, smallcat: string): Promise<Progress> {
		const url = `${this.ProgressUrl}/${id}/${smallcat}`;
		return this.http.get(url)
			.toPromise()
			.then(response => response.json() as Progress)
			.catch(this.handleError);
	}

	createProgress(Progress: Progress): Promise<Progress> {
		return this.http.post(this.ProgressUrl, Progress, { headers: this.headers })
			.toPromise()
			.then(res => {
				console.log(res);
				res.json()
			})
			.catch(this.handleError);
	}

	updateProgress(Progress: Progress): Promise<Progress> {
		const url = `${this.ProgressUrl}/${Progress.user}`;
		return this.http.put(url, JSON.stringify(Progress), { headers: this.headers })
			.toPromise()
			.then(res => {
				console.log(res);
				res.json() as Progress
			})
			.catch(this.handleError);
	}

	deleteProgress(id: string): Promise<void> {
		const url = `${this.ProgressUrl}/${id}`;
		return this.http.delete(url, { headers: this.headers })
			.toPromise()
			.then(() => null)
			.catch(this.handleError);
	}

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Promise.reject(error.message || error);
	}
}
