import { NgModule }             from '@angular/core';
import { Routes,
         RouterModule }         from '@angular/router';

import { SentenceComponent }   from './sentence.component';

const routes: Routes = [
    {
        path: '',
        component: SentenceComponent,
        data: {
            title: 'Sentence'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SentenceRoutingModule {}
