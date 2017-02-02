export class Sentence {
	_id: string;
	name: string;
	answer: string;
	disable: boolean= false;
	complement: string[];
	verb: string[];
	subject: string[];
	object: string[];
	post1: string[];
	post2: string[];
	priority: number;
	step: number;
}
