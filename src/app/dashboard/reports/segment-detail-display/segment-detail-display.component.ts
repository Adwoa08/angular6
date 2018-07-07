import { Component, Input, OnChanges } from '@angular/core';


@Component({
    selector: 'segment-detail-display',
    templateUrl: './segment-detail-display.component.html',
    styles: [`
        .ng-content-col {position: relative;}
        .ng-content-col .diff-indicator { position: absolute; right: 4px; top: 8px; color: red; font-size: 20px; }
        .segment-detail-form-header { font-weight: bold; font-style: italic; }
        p { padding-left: 12px; }
        .segment-detail-existing-record { top: 7px; }

    `]
})
export class SegmentDetailDisplayComponent implements OnChanges {
    @Input() label: string;
    @Input() data;
    @Input() displaystate;
    isHeader: boolean;
    hideDiffIndicator: boolean;
    constructor() {}
    ngOnChanges() {
        this.hideDiffIndicator = !(!!this.displaystate);
        this.isHeader = !(!!this.label);
        if(this.isHeader) this.hideDiffIndicator = this.isHeader;
    }
}
