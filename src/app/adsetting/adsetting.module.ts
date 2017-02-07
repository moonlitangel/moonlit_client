import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
//import { FileSelectDirective } from 'ng2-file-upload';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ShareModule } from './../share/share.module';

import { AdsettingComponent } from './adsetting.component';
import { AdTableComponent } from './ad-table/ad-table.component';
import { AdEditComponent } from './ad-edit/ad-edit.component';
import { AdsettingRoutingModule } from './adsetting-routing.module';
import { AdService } from './ad.service';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AdsettingRoutingModule,
        ChartsModule,
        ShareModule
    ],
    declarations: [AdsettingComponent, AdTableComponent, AdEditComponent],
    providers: [AdService]
})
export class AdsettingModule { }
