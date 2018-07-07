import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { PharmacyRouting, pharmacyRoutingComponents } from './pharmacy.routing';



@NgModule({
  imports: [
    CommonModule,
    PharmacyRouting
  ],
  declarations: [pharmacyRoutingComponents]
})
export class PharmacyModule { }
