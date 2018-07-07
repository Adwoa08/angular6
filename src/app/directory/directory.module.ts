import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { DirectoryRouting, directoryRoutingComponents } from './directory.routing';

@NgModule({
  imports: [
    CommonModule,
    DirectoryRouting
  ],
  declarations: [directoryRoutingComponents]
})
export class DirectoryModule { }
