import { NgModule, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Third party lib
import { TOASTR_TOKEN, Toastr } from './toastr.service';
import { JQ_TOKEN } from './jquery.service'; 
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

// Services
import { AddHeadersInterceptor } from './interceptors/header.interceptor';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { CacheInterceptor } from './interceptors/cache.interceptor';
import { HttpCacheService } from './http/http.cache.service';
import { Defs } from './defs.service';

import { throwIfAlreadyLoaded } from './core-module.imports.guard';

import { PageNotFoundComponent } from './404.component';
import { LoggerService } from './logger.service';




const toastr: Toastr = window['toastr'];
const jQuery = window['$'];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  exports: [PageNotFoundComponent],
  declarations: [PageNotFoundComponent],
  providers: [
    Defs,
    LoggerService,
    { provide: TOASTR_TOKEN, useValue: toastr },
    { provide: JQ_TOKEN, useValue: jQuery },
    { provide: HTTP_INTERCEPTORS, useClass: AddHeadersInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
    HttpCacheService,
    // LogisticsSvc
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
 }
