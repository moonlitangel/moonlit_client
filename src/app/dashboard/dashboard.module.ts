import { NgModule }                 from '@angular/core';
import { ChartsModule }             from 'ng2-charts/ng2-charts';
import { FileSelectDirective } from 'ng2-file-upload';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DatePickerModule } from 'ng2-datepicker';

import { DashboardComponent }       from './dashboard.component';
import { DashboardRoutingModule }   from './dashboard-routing.module';

import { JsonPlaceholderComponent } from './jsonplaceholder.component';
import { JsonPlaceholderService } from './jsonplaceholder.service';
import { JsonPostComponent } from './json-post/json-post.component';

@NgModule({
    imports: [
			CommonModule,
			FormsModule,
        DashboardRoutingModule,
        ChartsModule,
        DatePickerModule
    ],
    declarations: [ DashboardComponent ]
})
export class DashboardModule { }
