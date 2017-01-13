import { NgModule }             from '@angular/core';
import { Routes,
         RouterModule }         from '@angular/router';

import { QuizTableComponent }   from './quiz-table.component';
import { QuizCategoryComponent} from './quiz-category/quiz-category.component';
import { QuizComponent }   from './quiz.component';

const routes: Routes = [
    { path: '', component: QuizComponent, data: { title: 'Quiz' } },
		{ path: ':name', component: QuizCategoryComponent, data: { title: 'Quiz' } }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class QuizRoutingModule {}
