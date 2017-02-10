import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Quiz } from './quiz';
import { QuizCategory } from './quiz-category/quiz-category';

@Injectable()
export class QuizService {
	private token = localStorage.getItem('currentUser');
	private headers = new Headers({ 'Content-Type': 'application/json', 'x-access-token': this.token });
	private QuizUrl = 'http://52.175.147.246:3000/api/quiz';
	private ApiUrl = 'http://52.175.147.246:3000/api';

	constructor(private http: Http) { }
	getAllQuiz(smallcat: string): Promise<Quiz[]> {
		const url = `${this.QuizUrl}/${smallcat}`;
		return this.http.get(url, { headers: this.headers })
			.toPromise()
			.then(response => response.json() as Quiz[])
			.catch(this.handleError);
	}

	getQuiz(smallcat: string, id: string): Promise<Quiz> {
		const url = `${this.QuizUrl}/${smallcat}/${id}`;
		return this.http.get(url, { headers: this.headers })
			.toPromise()
			.then(response => response.json() as Quiz)
			.catch(this.handleError);
	}

	createQuiz(Quiz: Quiz): Promise<void> {
		return this.http.post(this.QuizUrl, Quiz, { headers: this.headers })
			.toPromise()
			.then(res => {
				console.log(res);
				res.json()
			})
			.catch(this.handleError);
	}

	updateQuiz(Quiz: Quiz): Promise<void> {
		const url = `${this.QuizUrl}/${Quiz._id}`;
		return this.http.put(url, JSON.stringify(Quiz), { headers: this.headers })
			.toPromise()
			.then(res => {
				console.log(res);
				res.json() as Quiz
			})
			.catch(this.handleError);
	}

	deleteQuiz(id: string): Promise<void> {
		const url = `${this.QuizUrl}/${id}`;
		return this.http.delete(url, { headers: this.headers })
			.toPromise()
			.then(() => null)
			.catch(this.handleError);
	}

	getCategory(): Promise<QuizCategory[]> {
		const url = `${this.ApiUrl}/category`;
		return this.http.get(url, { headers: this.headers })
			.toPromise()
			.then(response => response.json() as QuizCategory[])
			.catch(this.handleError);
	}

	getOneCategory(name: string): Promise<QuizCategory[]> {
		const url = `${this.ApiUrl}/category/${name}`;
		return this.http.get(url, { headers: this.headers })
			.toPromise()
			.then(response => response.json() as QuizCategory[])
			.catch(this.handleError);
	}

	getSmallCategory(name: string): Promise<QuizCategory> {
		const url = `${this.ApiUrl}/smallcat/${name}`;
		return this.http.get(url, { headers: this.headers })
			.toPromise()
			.then(response => response.json() as QuizCategory)
			.catch(this.handleError);
	}

	createCategory(QuizCategory: QuizCategory): Promise<void> {
		const url = `${this.ApiUrl}/category/`;
		return this.http.post(url, JSON.stringify(QuizCategory), { headers: this.headers })
			.toPromise()
			.then(res => {
				console.log(res);
				res.json()
			})
			.catch(this.handleError);
	}

	updateCategory(QuizCategory: QuizCategory): Promise<void> {
		const url = `${this.ApiUrl}/smallcat/${QuizCategory._id}`;
		return this.http.put(url, JSON.stringify(QuizCategory), { headers: this.headers })
			.toPromise()
			.then(res => {
				console.log(res);
				res.json() as QuizCategory
			})
			.catch(this.handleError);
	}

	deleteCategory(name: string): Promise<void> {
		const url = `${this.ApiUrl}/smallcat/${name}`;
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
