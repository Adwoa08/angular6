import { Component, Input, Output, OnChanges, Inject, EventEmitter } from '@angular/core';
import { JQ_TOKEN } from '../../../core/jquery.service';

@Component({
    selector: 're-edit',
    template: `
        <a>
            <button id="editBtn"
                *ngIf="!isSubmitted" 
                class="btn btn-warning" 
                [style.font-style]="'italic'" 
                (click)="onEdit()"
                [disabled]="isAllEditBtnsDisabled">{{btnLabel}}</button>
           <i [ngStyle]="{'color': 'green', 'font-size': '20px', 'margin-left': '20px' }" class="fa fa-check" *ngIf="isSubmitted"></i>
        </a>
    `,
    styles: []
})
export class ReportEditComponent implements OnChanges {
    @Output() editClicked:EventEmitter<any> = new EventEmitter<any>();
    @Input() isAllEditBtnsDisabled: boolean;
    @Input() edit: boolean;
    @Input() isSubmitted: boolean;
    
    btnLabel = 'Edit';
    
    constructor(@Inject(JQ_TOKEN) private $: any){}
    
    ngOnChanges(){
        this.changeBtnLabel();
    }

    changeBtnLabel(){
        if(this.edit){
            this.btnLabel = 'Editing';
        } else {
            this.btnLabel = 'Edit';
        }
    }

    onEdit() {
        this.editClicked.emit('Clicked');
    }
}