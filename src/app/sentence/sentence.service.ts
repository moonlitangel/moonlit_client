import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Sentence } from './sentence';

@Injectable()
export class SentenceService {

	private headers = new Headers({ 'Content-Type': 'application/json' });
	private SentenceUrl = 'http://localhost:3000/api/sentence';
	private ApiUrl = 'http://localhost:3000/api/';

	constructor(private http: Http) { }
	getAllSentence(): Promise<Sentence[]> {
		//const url = `${this.SentenceUrl}/${smallcat}`;
		return this.http.get(this.SentenceUrl)
			.toPromise()
			.then(response => response.json() as Sentence[])
			.catch(this.handleError);
	}

	getSentence(id: string): Promise<Sentence> {
		const url = `${this.SentenceUrl}/${id}`;
		return this.http.get(url)
			.toPromise()
			.then(response => response.json() as Sentence)
			.catch(this.handleError);
	}

	createSentence(Sentence: Sentence): Promise<Sentence> {
		return this.http.post(this.SentenceUrl, Sentence, {headers: this.headers})
		.toPromise()
		.then(res => {
			console.log(res);
			res.json()})
		.catch(this.handleError);
	}

	updateSentence(Sentence: Sentence): Promise<Sentence> {
		const url = `${this.SentenceUrl}/${Sentence._id}`;
		return this.http.put(url, JSON.stringify(Sentence), {headers: this.headers})
		.toPromise()
		.then(res => {
			console.log(res);
			res.json() as Sentence})
		.catch(this.handleError);
	}

	deleteSentence(id: string): Promise<void> {
		const url = `${this.SentenceUrl}/${id}`;
		return this.http.delete(url, {headers: this.headers})
			.toPromise()
			.then(() => null)
			.catch(this.handleError);
	}

	/*getCategory(): Promise<QuizCategory[]> {
		const url = `${this.ApiUrl}/category`;
		return this.http.get(url)
			.toPromise()
			.then(response => response.json() as QuizCategory[])
			.catch(this.handleError);
	}

	getOneCategory(name: string): Promise<QuizCategory[]> {
		const url = `${this.ApiUrl}/category/${name}`;
		return this.http.get(url)
			.toPromise()
			.then(response => response.json() as QuizCategory[])
			.catch(this.handleError);
	}*/

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Promise.reject(error.message || error);
	}
}