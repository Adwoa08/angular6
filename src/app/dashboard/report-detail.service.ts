import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

// third party
// import * as moment from 'moment';
import * as moment from 'moment-timezone';


import { BuzFunctionalityService } from '../shared/buz-func.service';
import { Defs } from '../core/defs.service';


@Injectable()
export class DashboardReportDetailService {
    pats: any[];
    patsDiffs: any;

    dsps: any[];
    dspsDiffs: any;

    pres: any[];
    presDiffs: any;

    cdis: any[];
    cdisDiffs: any;

    airs: any[];
    airsDiffs: any;

    searchResults: any[];
    isReportCreated = false;
    createdReportId = null;
    patientId = null;

    constructor(private _http: HttpClient,
                private _buzfns: BuzFunctionalityService,
                private _defs: Defs) {}

    async getPrescriptionRefills(prescriptions) {
        let rxNumber;
        let singleResult;
        prescriptions = this._buzfns.strToIntArr(prescriptions);
        const rxArrayLength = prescriptions.length;
        switch (rxArrayLength) {
            case 1:
                rxNumber = prescriptions[rxArrayLength - 1];
                singleResult = await this.getRefills(rxNumber);
                if (singleResult.Items.length === 0) {
                    this.searchResults = singleResult.Items;
                    // toasterNotifications.Info({ data: rxNumber });
                    return singleResult;
                } else {
                    singleResult = await this.processResponse(singleResult);
                    return singleResult;
                }
               // break;
            case 2:
                rxNumber = prescriptions[0];
                var firstResult: any = await this.getRefills(rxNumber);

                var isFirstResultEmpty = firstResult.Items.length === 0 ? true : false;
                if (isFirstResultEmpty) {
                    // toasterNotifications.Info({ data: rxNumber });
                }

                rxNumber = prescriptions[1];
                var secondResult: any = await this.getRefills(rxNumber);
                var isSecondResultEmpty = secondResult.Items.length === 0 ? true : false;
                if (isSecondResultEmpty) {
                    // toasterNotifications.Info({ data: rxNumber });
                }

                if (!isFirstResultEmpty && !isSecondResultEmpty) {
                    firstResult.Items = firstResult.Items.concat(secondResult.Items);
                    singleResult = firstResult;
                    return this.processResponse(singleResult);
                } else if (!isFirstResultEmpty && isSecondResultEmpty) {
                    singleResult = firstResult;
                    return this.processResponse(singleResult);
                } else if (isFirstResultEmpty && !isSecondResultEmpty) {
                    singleResult = secondResult;
                    return this.processResponse(singleResult);
                }

                break;
            case 3:
                rxNumber = prescriptions[0];
                var firstResult: any = await this.getRefills(rxNumber);

                var isFirstResultEmpty = firstResult.Items.length === 0 ? true : false;
                if (isFirstResultEmpty) {
                    // toasterNotifications.Info({ data: rxNumber });
                }

                rxNumber = prescriptions[1];
                var secondResult: any = await this.getRefills(rxNumber);
                var isSecondResultEmpty = secondResult.Items.length == 0 ? true : false;
                if (isSecondResultEmpty) {
                    // toasterNotifications.Info({ data: rxNumber });
                }


                rxNumber = prescriptions[2];
                var thirdResult: any = await this.getRefills(rxNumber);
                var isThirdResultEmpty = thirdResult.Items.length == 0 ? true : false;
                if (isThirdResultEmpty) {
                    // toasterNotifications.Info({ data: rxNumber });
                }

                if (!isFirstResultEmpty && !isSecondResultEmpty && !isThirdResultEmpty) {
                    firstResult.Items = firstResult.Items.concat(secondResult.Items, thirdResult.Items);
                    singleResult = firstResult;
                    return this.processResponse(singleResult);
                } else if (!isFirstResultEmpty && !isSecondResultEmpty && isThirdResultEmpty) {
                    firstResult.Items = firstResult.Items.concat(secondResult.Items);
                    singleResult = firstResult;
                    return this.processResponse(singleResult);
                } else if (!isFirstResultEmpty && isSecondResultEmpty && !isThirdResultEmpty) {
                    firstResult.Items = firstResult.Items.concat(thirdResult.Items);
                    singleResult = firstResult;
                    return this.processResponse(singleResult);
                } else if (isFirstResultEmpty && !isSecondResultEmpty && !isThirdResultEmpty) {
                    secondResult.Items = secondResult.Items.concat(thirdResult.Items);
                    singleResult = secondResult;
                    return this.processResponse(singleResult);

                } else if (!isFirstResultEmpty && isSecondResultEmpty && isThirdResultEmpty) {
                    return this.processResponse(firstResult);
                } else if (isFirstResultEmpty && !isSecondResultEmpty && isThirdResultEmpty) {
                    return this.processResponse(secondResult);
                } else if (isFirstResultEmpty && isSecondResultEmpty && !isThirdResultEmpty) {
                    return this.processResponse(thirdResult);
                }

                break;
        }
    }





    initSearchResult(result) {
        result.Submitted = false;
        result.Editing = false;
        return result;
    }

    groupResult(myArr) {
        const newArr = [];
        const details = {};
        let i, j, curObj;
        for (i = 0, j = myArr.length; i < j; i++) {
            curObj = myArr[i];
            // if(!!curObj.PatientFirstName){
            //     curObj.PatientFirstName.trim();
            // }
            if (!(curObj.RxNumber in details)) {
                details[curObj.RxNumber] = {
                    RxNumber: curObj.RxNumber,
                    PatientId: curObj.PatientId,
                    PatientName: curObj.PatientFirstName + ' ' + curObj.PatientLastName,
                    Details: []
                };

                newArr.push(details[curObj.RxNumber]);
            }
            details[curObj.RxNumber].Details.push(curObj);
        }
        return newArr;
    }

    initShortDate(date) {
        return moment(`${date}`).format('M/D/YY');
    }


    processResponse(result) {
        result.Items.forEach(this.initSearchResult);
        result.Items = this.groupResult(result.Items);
        this.searchResults = result.Items;
        return result;
    }


    getSegmentDetailsUrl(segmentName) {
        let url;
        switch (segmentName) {
            case 'pat':
                url = `api/StateReports/GetPatDetails`;
                break;
            case 'dsp':
                url = `http://localhost:3000/api/StateReports/GetDspDetails`;
                break;
            case 'pre':
                url = `api/StateReports/GetPreDetails`;
                break;
            case 'cdi':
                url = `api/StateReports/GetCdiDetails`;
                break;
            case 'air':
                url = `api/StateReports/GetAirDetails`;
                break;
        }
        return url;

    }

    async getSegmentDetails(segmentName) {
       const url = this.getSegmentDetailsUrl(segmentName);
    //    var getExistingSr = $.get(url, { stateReportId: null, patientId: svc.patientId });
    //    var getCreatedSr = $.get(url, { stateReportId: svc.createdReportId, patientId: svc.patientId });
        const getExistingSr = this._http.get(`${url}/0`).toPromise();
        const getCreatedSr = this._http.get(`${url}/1`).toPromise();
        const results = await Promise.all([getExistingSr, getCreatedSr]);

        this.setCreatedSegmentValues(segmentName, results[1]['Items']);

        if (segmentName === 'dsp') {
            // Formats the date fields on the created reports
            results[1]['Items'][0].DateFilled = this.initShortDate(results[1]['Items'][0].DateFilled);
            results[1]['Items'][0].DateWritten = this.initShortDate(results[1]['Items'][0].DateWritten);
            // tslint:disable-next-line:max-line-length
            results[1]['Items'][0].DateSold = !!results[1]['Items'][0].DateSold ? this.initShortDate(results[1]['Items'][0].DateSold) : results[1]['Items'][0].DateSold;
            // Formats the date fields on the existing reports
            results[0]['Items'][0].DateFilled = this.initShortDate(results[0]['Items'][0].DateFilled);
            results[0]['Items'][0].DateWritten = this.initShortDate(results[0]['Items'][0].DateWritten);
            // tslint:disable-next-line:max-line-length
            results[0]['Items'][0].DateSold = !!results[0]['Items'][0].DateSold ? this.initShortDate(results[0]['Items'][0].DateSold) : results[0]['Items'][0].DateSold;
        }

        const diffObj = await this.isEquivalent(results[0]['Items'][0], results[1]['Items'][0]);

        this.setExistingAndCreatedSegmentDiffValues(segmentName, diffObj);

        return results;
    }

    getRefills(rxNumber) {
        // const params = new HttpParams().set("prescription", rxNumber);
        return this._http.get(`http://localhost:3000/api/StateReports/${rxNumber}`).toPromise();
    }


    getUpdateUrl(segmentName) {
        let url;
        switch (segmentName) {
            case 'pat':
                url = `api/StateReports/UpdatePatFields`;
                break;
            case 'dsp':
                url = `api/StateReports/UpdateDspFields`;
                break;
            case 'pre':
                url = `api/StateReports/UpdatePreFields`;
                break;
            case 'cdi':
                url = `api/StateReports/UpdateCdiFields`;
                break;
            case 'air':
                url = `api/StateReports/UpdateAirFields`;
                break;
        }
        console.log(url);
        return url;
    }

    setCreatedSegmentValues(segmentName, data) {

        switch (segmentName) {
            case 'pat':
                this.pats = data;
                break;
            case 'dsp':
                this.dsps = data;
                break;
            case 'pre':
                this.pres = data;
                break;
            case 'cdi':
                this.cdis = data;
                break;
            case 'air':
                this.airs = data;
                break;
        }
    }

    setExistingAndCreatedSegmentDiffValues(segmentName, data) {
        switch (segmentName) {
            case 'pat':
                this.patsDiffs = data;
                break;
            case 'dsp':
                this.dspsDiffs = data;
                break;
            case 'pre':
                this.presDiffs = data;
                break;
            case 'cdi':
                this.cdisDiffs = data;
                break;
            case 'air':
                this.airsDiffs = data;
                break;
        }
    }

    isEquivalent(a, b) {
        const output = {};
        if (!!a && !!b) {
            const aProps = Object.getOwnPropertyNames(a);
            const bProps = Object.getOwnPropertyNames(b);


            for (let i = 0; i < aProps.length; i++) {
                const propName = aProps[i];
                const aValue = !!a[propName] && typeof a[propName] !== 'number' ? a[propName].trim() : a[propName];
                const bValue = !!b[propName] && typeof b[propName] !== 'number' ? b[propName].trim() : b[propName];

                if (aValue !== bValue) {
                    if (!((aValue == null || aValue === '') && (bValue == null || bValue === ''))) {
                        output[propName] = true;
                    }
                }
            }
        }
        return output;
    }

    reportDateUtc(date) {
        const dateStr = moment(date).format('YYYY-MM-DD');
        return moment.tz(dateStr, this._defs.reportingTimeZone).utc().format();
    }



    // var pharmacies = Settings.pharmacy.query(function () {
    //     pharmacies.forEach(function (pharmacy) {
    //         pharmacy.Selected = false;
    //     });

    //     if (pharmacies.length === 1) {
    //         pharmacies[0].Selected = true;
    //     }
    // });



}
