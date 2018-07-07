import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { PharmacyComponent } from './pharmacy.component';

const routes: Routes = [
    { path: 'pharmacy', component: PharmacyComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PharmacyRouting {}
export const pharmacyRoutingComponents = [PharmacyComponent];