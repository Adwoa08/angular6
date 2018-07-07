import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
// Components
import { DashboardComponent } from './dashboard.component';
import { ReportDetailComponent } from './reports/reports.component';

import { ReportDetailResolver } from './reports-details-resolver.service';

const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'reports', component: ReportDetailComponent,
    // resolve: { data: ReportDetailResolver}
 }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    declarations: []
})

export class DashboardRoutingModule {}
export const dashboardRoutingComponents = [DashboardComponent, ReportDetailComponent];
