import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DashboardReportDetailService } from '../report-detail.service';
import { JQ_TOKEN } from '../../core/jquery.service';

// declare var $: any;

@Component({
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.scss']
})
export class ReportDetailComponent implements OnInit {
    isReportCreated = false;
    prscSearchResults = [];
    isSearchResultEmpty = false; // puts the search box on the entire page
    isSearchBoxEmptied = false; // clear search box if true
    isAllEditBtnsDisabled = false;
    selectedResult: any;
    closeBtnLabel = 'Close';
    saveBtnLabel = 'Submit';
    detailDataFetched = {
        pat: false,
        dsp: false,
        pre: false,
        air: false,
        cdi: false
    };

    // modal variables for presentation
    patsDiffs: any;
    pats: any;
    pat: any;

    dspsDiffs: any;
    dsps: any;
    dsp: any;

    presDiffs: any;
    pres: any;
    pre: any;

    cdisDiffs: any;
    cdis: any;
    cdi: any;

    airsDiffs: any;
    airs: any;
    air: any;


    constructor(@Inject(JQ_TOKEN) private $: any,
                private _dbDetailService: DashboardReportDetailService,
                private _route: ActivatedRoute) {}
    ngOnInit() {
        // this.prscSearchResults = this._route.snapshot.data['data'];

        this.prscSearchResults = !!this._dbDetailService.searchResults ? this._dbDetailService.searchResults : [];
        console.log(this.prscSearchResults);
        this.isSearchResultEmpty = (this.prscSearchResults.length === 0);
        this.isSearchBoxEmptied = (this.prscSearchResults.length > 0);
    }

    async searchReportByPrescriptionsClick(prscArr) {
        if (!!prscArr) {
            const result = await this._dbDetailService.getPrescriptionRefills(prscArr);
            this.prscSearchResults = result.Items;
            this.isSearchResultEmpty = (this.prscSearchResults.length === 0);
            this.isSearchBoxEmptied = !this.isSearchResultEmpty;
        }
    }

    onEditClicked(e, res) {
        this.selectedResult = res;
        this.selectedResult.Editing = true;
        this.isAllEditBtnsDisabled = true;
        this.$(`#segment-modal`).modal({backdrop: 'static'});
    }

    handleFormSubmit(id, data) {
        console.log(data);
        this.closeModal(id);
        this.isAllEditBtnsDisabled = false;
        this.selectedResult.Editing = false;
        this.selectedResult.Submitted = true;
        this.setAllSegmentFetchedFalse();
    }

    handleCancelledForm(id, e) {
        console.log(e);
        this.closeModal(id);
        this.isAllEditBtnsDisabled = false;
        this.selectedResult.Editing = false;
    }

    getSegmentDetails(segmentName) {
        if (segmentName === 'dsp') {
            this._dbDetailService.getSegmentDetails(segmentName).then(
                data => {
                    this.setDisplayValues(segmentName, data);
                },
                err => console.log(err)
            );
        } else {
            const data = [{Items: [{FirstName: 'Foo', LastName: 'Bar'}]}, {Items: [{FirstName: 'Jane', LastName: 'Doe'}]}];
            this.setDisplayValues(segmentName, data);
        }
    }


    setDisplayValues(segmentName, data) {
        const i = 'Items';
        switch (segmentName) {
            case 'pat':
                this.pats = data[0][i][0];
                this.pat = data[1][i][0];
                this.patsDiffs = this._dbDetailService.patsDiffs;
                break;
            case 'dsp':
                this.dsps = data[0]['Items'][0];
                this.dsp = data[1]['Items'][0];
                this.dspsDiffs = this._dbDetailService.dspsDiffs;
                break;
            case 'pre':
                this.pres = data[0][i][0];
                this.pre = data[1][i][0];
                this.presDiffs = this._dbDetailService.presDiffs;
                break;
            case 'cdi':
                this.cdis = data[0][i][0];
                this.cdi = data[1][i][0];
                this.cdisDiffs = this._dbDetailService.cdisDiffs;
                break;
            case 'air':
                this.airs = data[0][i][0];
                this.air = data[1][i][0];
                this.airsDiffs = this._dbDetailService.airsDiffs;
                break;
        }
        this.setSegmentFetchedTrue(segmentName);

    }

    setAllSegmentFetchedFalse() {
        Object.keys(this.detailDataFetched).forEach(v => this.detailDataFetched[v] = false);
    }
    setSegmentFetchedTrue(segmentName) {
        switch (segmentName) {
            case 'dsp':
                this.detailDataFetched.dsp = true;
                break;
            case 'pat':
                this.detailDataFetched.pat = true;
                break;
            case 'pre':
                this.detailDataFetched.pre = true;
                break;
            case 'cdi':
                this.detailDataFetched.cdi = true;
                break;
            case 'air':
                this.detailDataFetched.air = true;
                break;
        }
    }

    closeModal(id) {
        this.$(`#${id}`).modal('hide');
    }
}
