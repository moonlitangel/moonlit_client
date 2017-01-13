import { Directive, HostListener } from '@angular/core';

import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';

/**
* Allows the aside to be toggled via click.
*/
@Directive({ selector: '[ng2FileSelect]' })
export class FileUploadDirective {
    constructor() { }
}
