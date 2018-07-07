import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

// third party libraries
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import {
    TooltipModule
} from 'ngx-bootstrap';

import { AjaxLoadingSpinner } from './spinner/ajax-spinner.component';
import { AwModalComponent } from './awModal/awModal.component';
import { ModalTriggerDirective } from './modal-trigger.directive';
import { BuzFunctionalityService } from './buz-func.service';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    AngularFontAwesomeModule,
    TooltipModule.forRoot(),
  ],
  declarations: [AjaxLoadingSpinner, AwModalComponent, ModalTriggerDirective],
  exports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    AngularFontAwesomeModule,
    TooltipModule,
    AjaxLoadingSpinner,
    AwModalComponent,
    ModalTriggerDirective
  ],
  providers: [
    BuzFunctionalityService
  ]
})
export class SharedModule { }
