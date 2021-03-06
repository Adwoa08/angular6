import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { DirectoryComponent } from './directory.component';


const routes: Routes = [
    { path: 'directory', component: DirectoryComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class DirectoryRouting {}
export const directoryRoutingComponents = [DirectoryComponent];