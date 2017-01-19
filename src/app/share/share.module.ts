import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileSelectDirective } from 'ng2-file-upload';
import { DatePickerModule } from 'ng2-datepicker';

@NgModule({
  imports: [CommonModule, DatePickerModule],
  declarations: [FileSelectDirective],
  exports: [FileSelectDirective, DatePickerModule]
})
export class ShareModule { }
