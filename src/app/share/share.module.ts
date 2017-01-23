import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabsModule } from 'ng2-bootstrap';
import { FileSelectDirective } from 'ng2-file-upload';
import { DatePickerModule } from 'ng2-datepicker';

@NgModule({
  imports: [CommonModule, DatePickerModule, TabsModule],
  declarations: [FileSelectDirective],
  exports: [FileSelectDirective, DatePickerModule, TabsModule]
})
export class ShareModule { }
