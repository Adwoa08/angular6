import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 're-searchbox',
    template: `
    <form (ngSubmit)="search(prscValues)">
        <div [ngClass]="{'input-group': !isSearchResultEmpty}">
            <input type="text" 
                class="form-control" 
                name="prscValues" 
                [(ngModel)]="prscValues" 
                placeholder="Separate prescriptions by comma" 
                aria-label="Separate prescriptions by comma"
                aria-describedby="sbtn"
                oninput="this.value = this.value.replace(/[^0-9,]/g, '');">
            <span [ngClass]="{'input-group-append': !isSearchResultEmpty, 'basicFlex': isSearchResultEmpty}">
                <button class="btn btn-primary input-group-text"
                        (click)="search(prscValues)"
                        type="button"
                        id="sbtn">
                    <span  [ngClass]="{'fa fa-search': !isSearchResultEmpty }">{{btnLabel}}</span>
                </button>
            </span>
        </div>
    </form>`,
    styleUrls: ['./reports-searchbox.component.scss']
})
export class ReportSearchboxComponent {
    @Output() onSearchClicked: EventEmitter<string> = new EventEmitter<string>();
    @Input() display: boolean;
    @Input() isSearchBoxEmptied: boolean;
    isSearchResultEmpty: boolean;
    btnLabel: string;
    prscValues: string;

    ngOnChanges(){
        this.btnLabel = this.display ? "Search" : "";
        this.isSearchResultEmpty = this.display;
        if(this.isSearchBoxEmptied) this.prscValues = "";
    }


    search(prscValues){
        this.onSearchClicked.emit(prscValues);
    }
    
}