import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

// Components
import { StatesComponent } from './states.component';

const routes: Routes = [
    { path: 'states', component: StatesComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class StatesRouting {}
export const stateRoutingComponents = [StatesComponent]