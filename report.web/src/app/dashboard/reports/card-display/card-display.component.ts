import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';




@Component({
    selector: 're-card-display',
    template: `
    <div class="card mb-2">
        <div class="card-header"
            [ngClass]="{'text-white bg-primary': primary === 'true'}"
            (click)="fetchData()">{{header}}</div>
        <div class="card-body" [hidden]='isHidden' >
            <ng-content></ng-content>
        </div>
    </div>  
    `,
    styles: [`
        [hidden] {display: none !important; }
        .card-header:hover { cursor: pointer }
    `]
})
export class CardDisplayComponent implements OnChanges {
    @Input() header;
    @Input() primary;
    @Input() segmentName;
    @Input() detailDataFetched;
    @Output() fetchClicked: EventEmitter<any> = new EventEmitter<any>();
    isHidden = true;

    ngOnChanges() {
        if (this.detailDataFetched) {
            this.toggle();
            console.log('data fetched');
        }
    }



    fetchData() {
        if (!this.detailDataFetched) {
            this.fetchClicked.emit(this.segmentName);
        } else {
            console.log('Inside fetchData - toggle called');
            this.toggle();
        }
        
    }


    toggle() {
        this.isHidden = !this.isHidden;
    }
}
