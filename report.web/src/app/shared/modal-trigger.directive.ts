import { Directive, OnInit, Inject, ElementRef, Input } from '@angular/core';

import { JQ_TOKEN } from '../core/jquery.service';


@Directive({
    selector: '[aw-modal-trigger]'
})

export class ModalTriggerDirective implements OnInit {

    @Input('aw-modal-trigger') modalId: string;

    private el: HTMLElement;
    constructor(@Inject(JQ_TOKEN) private $: any,
                private ref: ElementRef){
                    this.el = ref.nativeElement;
                }

    ngOnInit(){
        this.el.addEventListener('click', e => {
            this.$(`#${this.modalId}`).modal({})
        })
    }
}