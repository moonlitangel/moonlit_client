import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule
} from '@angular/router';

import { QuizTableComponent } from './quiz-table.component';
import { QuizCategoryComponent } from './quiz-category/quiz-category.component';
import { QuizComponent } from './quiz.component';
import { NewCategoryComponent } from './quiz-category/new-category.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Quiz'
        },
        children: [
            { path: 'newcategory', component: NewCategoryComponent, data: { title: 'Category'}},
            { path: 'edit/:name', component: QuizCategoryComponent, data: { title: 'Edit' }}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class QuizRoutingModule { }
