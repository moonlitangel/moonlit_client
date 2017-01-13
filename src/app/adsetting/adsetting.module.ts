import { NgModule }                 from '@angular/core';
import { ChartsModule }             from 'ng2-charts/ng2-charts';
//import { FileSelectDirective } from 'ng2-file-upload';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdsettingComponent }       from './adsetting.component';
import { AdsettingTableComponent } from './adsetting-table.component';
import { AdsettingRoutingModule }   from './adsetting-routing.module';


@NgModule({
    imports: [
			CommonModule,
			FormsModule,
        AdsettingRoutingModule,
        ChartsModule
    ],
    declarations: [ AdsettingComponent, AdsettingTableComponent ]//, FileSelectDirective ]
})
export class AdsettingModule { }
