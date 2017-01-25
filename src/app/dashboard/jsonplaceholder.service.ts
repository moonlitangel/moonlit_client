import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { JsonPlaceholder } from './jsonplaceholder';
import { User } from './user';

@Injectable()
export class JsonPlaceholderService {

	private headers = new Headers({ 'Content-Type': 'application/json' });
	private DataUrl = 'http://localhost:3000/api/quiz';

	constructor(private http: Http) { }

	user(User: User): Promise<User> {
		const Url = 'http://52.175.147.246:3000/api/user';
		return this.http.post(Url, User, {headers: this.headers})
			.toPromise()
			.then(res => {
			console.log(res);
			res.json()})
			.catch(this.handleError);
	}
	
	getAll(): Promise<JsonPlaceholder[]> {
		return this.http.get(this.DataUrl)
			.toPromise()
			.then(response => response.json() as JsonPlaceholder[])
			.catch(this.handleError);
	}

	getPost(smallcat: string, id: string): Promise<JsonPlaceholder> {
		const url = `${this.DataUrl}/${smallcat}/${id}`;
		return this.http.get(url)
			.toPromise()
			.then(response => response.json() as JsonPlaceholder)
			.catch(this.handleError);
	}

	create(JsonPlaceholder: JsonPlaceholder): Promise<JsonPlaceholder> {
		return this.http.post(this.DataUrl, JsonPlaceholder, {headers: this.headers})
		.toPromise()
		.then(res => {
			console.log(res);
			res.json()})
		.catch(this.handleError);
	}

	update(JsonPlaceholder: JsonPlaceholder): Promise<JsonPlaceholder> {
		const url = `${this.DataUrl}/${JsonPlaceholder._id}`;
		return this.http.put(url, JSON.stringify(JsonPlaceholder), {headers: this.headers})
		.toPromise()
		.then(res => {
			console.log(res);
			res.json() as JsonPlaceholder})
		.catch(this.handleError);
	}

	delete(id: string): Promise<void> {
		const url = `${this.DataUrl}/${id}`;
		return this.http.delete(url, {headers: this.headers})
			.toPromise()
			.then(() => null)
			.catch(this.handleError);
	}

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Promise.reject(error.message || error);
	}
}