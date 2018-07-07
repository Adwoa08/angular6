import { NgModule } from '@angular/core';

// Third party lib
import {TableModule} from 'primeng/table';
import { AccordionModule } from 'primeng/components/accordion/accordion';
import { PanelModule } from 'primeng/components/panel/panel';
import { ButtonModule } from 'primeng/components/button/button';
import { RadioButtonModule } from 'primeng/components/radioButton/radioButton';


import { DashboardRoutingModule, dashboardRoutingComponents } from './dashboard.routing';
import { SharedModule } from '../shared/shared.module';
import { DashboardReportService } from '../core/http/dashboard.reports.service';
import { ReportDetailResolver } from './reports-details-resolver.service';
import { DashboardReportDetailService } from './report-detail.service';
import { ReportEditComponent } from './reports/reports-edit/reports-edit.component';
import { ReportSearchboxComponent } from './reports/reports-searchbox/reports-searchbox.component';
import { ReportsSegmentDetailModalComponent } from './reports/reports-segment-detail-modal/reports-segment-detail-modal.component';
import { SegmentDetailDisplayComponent } from './reports/segment-detail-display/segment-detail-display.component';
import { CardDisplayComponent } from './reports/card-display/card-display.component';


@NgModule({
  imports: [
    SharedModule,
    DashboardRoutingModule,
    TableModule,
    AccordionModule,
    PanelModule,
    ButtonModule,
    RadioButtonModule
  ],
  declarations: [
    dashboardRoutingComponents,
    ReportEditComponent,
    ReportSearchboxComponent,
    ReportsSegmentDetailModalComponent,
    SegmentDetailDisplayComponent,
    CardDisplayComponent
  ],
  providers: [
    DashboardReportService,
    DashboardReportDetailService,
    ReportDetailResolver
  ]
})
export class DashboardModule { }
