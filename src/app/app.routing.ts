import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule
} from '@angular/router';

//Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { LoginComponent } from './pages/login.component';
import { AuthGuard } from './_guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    { path: 'login', component: LoginComponent },
    {
        path: '',
        component: FullLayoutComponent,
        canActivate: [AuthGuard],
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
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
