export class Sentence {
	_id: string;
	name: string;
	answer: string;
	disable: boolean= false;
	complement: string[];
	verb: string[];
	subject: string[];
	priority: number;
}