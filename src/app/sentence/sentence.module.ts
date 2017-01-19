import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
//import { FileSelectDirective } from 'ng2-file-upload';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SentenceComponent } from './sentence.component';
import { SentenceRoutingModule } from './sentence-routing.module';
import { SentenceService } from './sentence.service';
import { SentenceTableComponent } from './sentence-table/sentence-table.component';
import { SentenceEditComponent } from './sentence-edit/sentence-edit.component';
import { TopikComponent } from './topik/topik.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SentenceRoutingModule,
        ChartsModule
    ],
    declarations: [SentenceComponent, SentenceTableComponent, SentenceEditComponent, TopikComponent],
    providers: [SentenceService]//, FileSelectDirective ]
})
export class SentenceModule { }
