import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Sentence } from './sentence';
import { Topik } from './topik';

@Injectable()
export class SentenceService {

	private headers = new Headers({ 'Content-Type': 'application/json' });
	private SentenceUrl = 'http://52.175.147.246:3000/api/sentence';
	private TopikUrl = 'http://52.175.147.246:3000/api/topik';
	private TopiksUrl = 'http://52.175.147.246:3000/api/topiks';
	private ApiUrl = 'http://52.175.147.246:3000/api';

	constructor(private http: Http) { }
	getAllSentence(): Promise<Sentence[]> {
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

	getStepSentence(step: number): Promise<Sentence[]> {
		const url = `${this.SentenceUrl}/step/${step}`;
		return this.http.get(url)
			.toPromise()
			.then(response => response.json() as Sentence[])
			.catch(this.handleError);
	}

	createSentence(Sentence: Sentence): Promise<Sentence> {
		return this.http.post(this.SentenceUrl, Sentence, { headers: this.headers })
			.toPromise()
			.then(res => {
				console.log(res);
				res.json()
			})
			.catch(this.handleError);
	}

	updateSentence(Sentence: Sentence): Promise<Sentence> {
		const url = `${this.SentenceUrl}/${Sentence._id}`;
		return this.http.put(url, JSON.stringify(Sentence), { headers: this.headers })
			.toPromise()
			.then(res => {
				console.log(res);
				res.json() as Sentence
			})
			.catch(this.handleError);
	}

	deleteSentence(id: string): Promise<void> {
		const url = `${this.SentenceUrl}/${id}`;
		return this.http.delete(url, { headers: this.headers })
			.toPromise()
			.then(() => null)
			.catch(this.handleError);
	}

	getAllTopik(): Promise<Topik[]> {
		return this.http.get(this.TopiksUrl)
			.toPromise()
			.then(response => response.json() as Topik[])
			.catch(this.handleError);
	}

	getTopik(time: Date): Promise<Topik[]> {
		const url = `${this.TopiksUrl}/${time}`;
		return this.http.get(url)
			.toPromise()
			.then(response => response.json() as Topik[])
			.catch(this.handleError);
	}

	getOneTopik(id: string): Promise<Topik> {
		const url = `${this.TopikUrl}/${id}`;
		return this.http.get(url)
			.toPromise()
			.then(response => response.json() as Topik)
			.catch(this.handleError);
	}

	createTopik(Topik: Topik): Promise<Topik> {
		return this.http.post(this.TopikUrl, Topik, { headers: this.headers })
			.toPromise()
			.then(res => {
				console.log(res);
				res.json()
			})
			.catch(this.handleError);
	}

	updateTopik(Topik: Topik): Promise<Topik> {
		const url = `${this.TopikUrl}/${Topik._id}`;
		return this.http.put(url, JSON.stringify(Topik), { headers: this.headers })
			.toPromise()
			.then(res => {
				console.log(res);
				res.json() as Topik
			})
			.catch(this.handleError);
	}

	deleteTopik(id: string): Promise<void> {
		const url = `${this.TopikUrl}/${id}`;
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
