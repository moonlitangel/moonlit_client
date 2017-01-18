import { NgModule }             from '@angular/core';
import { Routes,
         RouterModule }         from '@angular/router';

import { SentenceComponent }   from './sentence.component';
import { TopikComponent }   from './topik/topik.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Sentence'
        },
        children: [
            { path: 'topik', component: TopikComponent, data: { title:'Topik'} },
            { path: 'sentence', component: SentenceComponent, data: {title: 'Sentence'} }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SentenceRoutingModule {}
