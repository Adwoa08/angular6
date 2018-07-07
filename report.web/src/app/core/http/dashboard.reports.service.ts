import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
// Third party lib
import * as moment from 'moment-timezone';

// my imports
import { Defs } from '../defs.service';
import { IError } from '../../models/interfaces';
import { NgProgress } from '@ngx-progressbar/core';


@Injectable()
export class DashboardReportService {
    stateSettings: any;  
    dashboardReports: any = [];
    filters = {
        date: null,
        includeComplete: true
    };

    queryParams = {
        includeComplete: 'true',
        date: this.filters.date,
        pageSize: '10',
        pageNumber: '0'
      };
    
    constructor(private _http: HttpClient,
                private _defs: Defs,
                private progressService: NgProgress) { 
                    
                }
    async getStateSettings(){
        this.stateSettings = await this._http.get("http://localhost:3000/api/StateSettings").toPromise();
    }            
     
    // getStateReports(): Observable<any | IError> {
    //     const params = new HttpParams()
    //     .set('includeComplete', this.queryParams.includeComplete)
    //     .set('date', this.queryParams.date)
    //     .set('pageNumber', this.queryParams.pageNumber)
    //     .set('pageSize', this.queryParams.pageSize);
    //     return this._http.get("http://localhost:3000/api/StateReports")
    //         .pipe(
    //             map(res => {
    //                 if(!!(<any>res).Items){
    //                     (<any>res).Items.forEach((report) => {
    //                           this.initReport(report, this._defs.reportingTimeZone, this._defs.status);
    //                         });
    //                     return res;
    //                 }
    //                 return res;
    //             }),
    //             // catchError(err => this.handleHttpError(err))
    //         );
    // }
    async getStateReports() {
        const params = new HttpParams()
        .set('includeComplete', this.queryParams.includeComplete)
        .set('date', this.queryParams.date)
        .set('pageNumber', this.queryParams.pageNumber)
        .set('pageSize', this.queryParams.pageSize);
        await this.getStateSettings();
        let reports = await this._http.get("http://localhost:3000/api/StateReports").toPromise();
        await (<any>reports).Items.forEach(report => this.initReport(report, this._defs.reportingTimeZone, this._defs.status));
        return reports;
    }

    initReport(report, timezone, status) {
        report.CreateDate = new Date(report.CreateDate);
        report.EndDate = new Date(report.EndDate);
        report.Selected = false;
        report.StartDate = new Date(report.StartDate);
        if(!!report){
            report.StateSetting = this.stateSettings[report.StateProvinceId];
        }
        const endStr = moment(report.EndDate)
            .subtract(1, 's')
            .tz(timezone)
            .format('MM/DD/YY');

        const startStr = moment(report.StartDate)
            .tz(timezone)
            .format('MM/DD/YY');

        if (startStr === endStr) {
            report.DateRangeString = startStr;
        } else {
            report.DateRangeString = startStr + ' - ' + endStr;
        }


        if (report.StatusId === status['Failed']) {
            report.ActionRequired = true;
        }

        return report;
    }

    isEmpty(obj) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    }

    handleHttpError(err: HttpErrorResponse): Observable<IError> {
        const dataError = new IError();
        dataError.errorNumber = 100;
        dataError.message = err.statusText;
        dataError.friendlyMessage = 'An error occurred retrieving data.';
        this.progressService.complete();
        return throwError(dataError);
    }

}

