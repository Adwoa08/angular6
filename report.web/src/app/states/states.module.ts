import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatesRouting, stateRoutingComponents } from './states.routing';

@NgModule({
  imports: [
    CommonModule,
    StatesRouting
  ],
  declarations: [stateRoutingComponents]
})
export class StatesModule { }
