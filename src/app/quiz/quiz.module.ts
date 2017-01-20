import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ShareModule } from './../share/share.module';

import { QuizService } from './quiz.service';
import { QuizTableComponent } from './quiz-table.component';
import { QuizComponent } from './quiz.component';
import { QuizCategoryComponent } from './quiz-category/quiz-category.component';
import { QuizRoutingModule } from './quiz-routing.module';
import { QuizEditComponent } from './quiz-edit/quiz-edit.component';
import { NewCategoryComponent } from './quiz-category/new-category.component';


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		QuizRoutingModule,
		ChartsModule,
		ShareModule
	],
	declarations: [QuizComponent, QuizTableComponent, QuizCategoryComponent, QuizEditComponent, NewCategoryComponent],//FileSelectDirective ],
		providers: [QuizService]
})
export class QuizModule { }
