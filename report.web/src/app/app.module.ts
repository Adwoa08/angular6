import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


// Third party
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgProgressModule } from '@ngx-progressbar/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { StatesModule } from './states/states.module';
import { CoreModule } from './core/core.module';
import { PharmacyModule } from './pharmacy/pharmacy.module';
import { DirectoryModule } from './directory/directory.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AngularFontAwesomeModule,
    BsDropdownModule.forRoot(),
    NgProgressModule.forRoot(),
    DashboardModule,
    StatesModule,
    PharmacyModule,
    DirectoryModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
