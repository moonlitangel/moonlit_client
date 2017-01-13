import { NgModule }                 from '@angular/core';
import { Routes,
         RouterModule }             from '@angular/router';

//Layouts
import { FullLayoutComponent }      from './layouts/full-layout.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    {
        path: '',
        component: FullLayoutComponent,
        data: {
            title: 'Home'
        },
        children: [
            {
                path: 'dashboard',
                loadChildren: 'app/dashboard/dashboard.module#DashboardModule'
            },
						{
                path: 'quiz',
                loadChildren: 'app/quiz/quiz.module#QuizModule'
            },
						{
                path: 'sentence',
                loadChildren: 'app/sentence/sentence.module#SentenceModule'
            },
						{
                path: 'adsetting',
                loadChildren: 'app/adsetting/adsetting.module#AdsettingModule'
            }
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
