import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Ad } from './ad';

@Injectable()
export class AdService {

	private headers = new Headers({ 'Content-Type': 'application/json' });
	private AdUrl = 'http://52.175.147.246:3000/api/ad';
	private ApiUrl = 'http://52.175.147.246:3000/api';

	constructor(private http: Http) { }
	getAllAd(): Promise<Ad[]> {
		const url = `${this.AdUrl}`;
		return this.http.get(url)
			.toPromise()
			.then(response => response.json() as Ad[])
			.catch(this.handleError);
	}

	getAd(id: string): Promise<Ad> {
		const url = `${this.AdUrl}/${id}`;
		return this.http.get(url)
			.toPromise()
			.then(response => response.json() as Ad)
			.catch(this.handleError);
	}

	getQuizAd(quiz: string): Promise<Ad> {
		const url = `${this.AdUrl}/quiz/${quiz}`;
		return this.http.get(url)
			.toPromise()
			.then(response => response.json() as Ad)
			.catch(this.handleError);
	}

	createAd(Ad: Ad): Promise<void> {
		return this.http.post(this.AdUrl, Ad, { headers: this.headers })
			.toPromise()
			.then(res => {
				console.log(res);
				res.json()
			})
			.catch(this.handleError);
	}

	updateAd(Ad: Ad): Promise<void> {
		const url = `${this.AdUrl}/${Ad._id}`;
		return this.http.put(url, JSON.stringify(Ad), { headers: this.headers })
			.toPromise()
			.then(res => {
				console.log(res);
				res.json() as Ad
			})
			.catch(this.handleError);
	}

	deleteAd(id: string): Promise<void> {
		const url = `${this.AdUrl}/${id}`;
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
