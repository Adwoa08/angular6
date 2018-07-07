import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';


// third party lib
import { JQ_TOKEN } from '../core/jquery.service';
import { TOASTR_TOKEN, Toastr } from '../core/toastr.service';


import { DashboardReportService } from '../core/http/dashboard.reports.service';
import { DashboardReportDetailService } from './report-detail.service';




@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dashboardReports: any[];
  reportColumns;
  isPrscSearchEmpty = false;
  closeBtnLabel = 'Close';
  saveBtnLabel = 'Search';

// getSelectedRows() {
//   const selectedNodes = this.agGrid.api.getSelectedNodes();
//   const selectedData = selectedNodes.map( node => node.data );
//   const selectedDataStringPresentation = selectedData.map( node => node.make + ' ' + node.model).join(', ');
//   alert(`Selected nodes: ${selectedDataStringPresentation}`);
// }

  constructor(@Inject(JQ_TOKEN) private $: any,
              @Inject(TOASTR_TOKEN) private toastr: Toastr,
              private _dashboardReportService: DashboardReportService,
              private _dbDetailService: DashboardReportDetailService,
              private _router: Router) { }

  ngOnInit() {
    this._dashboardReportService.getStateReports().then(
      (res) => this.dashboardReports = (<any>res).Items,
      (err) => console.log(err)
    );

    this.reportColumns = [
      {field: 'StateProvinceId', header: 'State'},
      {field: 'RecordCount', header: 'Records'},
      {field: 'Status', header: 'Status'},
      {field: 'DateRangeString', header: 'Report Date(s)'},
      {field: 'CreateDate', header: 'Submission Date'},
      {field: 'ReportingMethod', header: 'Reporting Method'},
    ];
  }


  async onSearchByPrsc(id, prescriptions) {
    if (!!prescriptions && prescriptions.length > 6) {
      console.log(prescriptions);
      const results = await this._dbDetailService.getPrescriptionRefills(prescriptions);
      if (!!results.Items) {
        this.$(`#${id}`).modal('hide');
        this._router.navigate(['/reports']);
      }
    } else {
      this.isPrscSearchEmpty = true;
    }
  }

  handleModalClose(id, e) {
    console.log(e);
    this.$(`#${id}`).modal('hide');
  }

}
