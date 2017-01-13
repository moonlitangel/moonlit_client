import { NgModule }             from '@angular/core';
import { Routes,
         RouterModule }         from '@angular/router';

import { AdsettingComponent }   from './adsetting.component';
import { AdsettingTableComponent } from './adsetting-table.component';

const routes: Routes = [
    {
        path: '',
        component: AdsettingComponent,
        data: {
            title: 'Adsetting'
        },
				children: [
					{
						path: '',
						component: AdsettingTableComponent,
						data: {
							title: 'Small Category'
						}
					}
				]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdsettingRoutingModule {}
