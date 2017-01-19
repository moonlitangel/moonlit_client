import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ShareModule } from './../share/share.module';

import { SentenceComponent } from './sentence.component';
import { SentenceRoutingModule } from './sentence-routing.module';
import { SentenceService } from './sentence.service';
import { SentenceTableComponent } from './sentence-table/sentence-table.component';
import { SentenceEditComponent } from './sentence-edit/sentence-edit.component';

import { TopikComponent } from './topik/topik.component';
import { TopikTableComponent } from './topik/topik-table.component';
import { TopikEditComponent } from './topik/topik-edit.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SentenceRoutingModule,
        ChartsModule,
        ShareModule
    ],
    declarations: [
        SentenceComponent,
        SentenceTableComponent,
        SentenceEditComponent,
        TopikComponent,
        TopikTableComponent,
        TopikEditComponent
    ],
    providers: [SentenceService]
})
export class SentenceModule { }
