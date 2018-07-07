import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError} from 'rxjs/operators';

import { DashboardReportDetailService } from './report-detail.service';

@Injectable()
export class ReportDetailResolver implements Resolve<any> {
    constructor(private _reportDetailService: DashboardReportDetailService){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): any {
        return this._reportDetailService.getPrescriptionRefills(route.params['rx']);
        //.pipe(catchError(err => of(err)))
    }

}