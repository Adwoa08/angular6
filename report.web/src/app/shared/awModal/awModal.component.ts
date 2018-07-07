import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { JQ_TOKEN } from '../../core/jquery.service';


@Component({
    selector: 'aw-modal',
    templateUrl: './awModal.component.html',
    styles: [`
    .modal-dialog.segment-modal { 
            width: 80%;
            margin: auto;
        }
        @media (min-width: 576px){
            .modal-dialog.segment-modal {
                max-width: 80%;
                margin: 1.75rem auto;
            }
        }

    `]
})
export class AwModalComponent {
    @Input() title: string;
    @Input() awElementId: string;
    @Input() closeBtnLabel: string;
    @Input() saveBtnLabel: string;
    // tslint:disable-next-line:no-output-on-prefix
    @Output() onSaveClicked: EventEmitter<any> = new EventEmitter<any>();
    // tslint:disable-next-line:no-output-on-prefix
    @Output() onCancelClicked: EventEmitter<string> = new EventEmitter<string>();

    constructor(@Inject(JQ_TOKEN) private $: any ) {}

    submitted() {
        this.onSaveClicked.emit();
    }

    cancelled() {
        this.onCancelClicked.emit('Cancelled');
    }
}
