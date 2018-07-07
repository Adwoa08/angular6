import { Component } from '@angular/core';

@Component({
    selector: 'ajax-loading-spinner',
    template: `
        <div class="col-xs-8 col-xs-offset-2 col-sm-4 col-sm-offset-4 col-md-4 col-md-offset-4">
            <div class="lds-css ng-scope">
                <div class="lds-spinner" style="width:100%;height:100%"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>
        </div>`,
    styleUrls: ['./ajax-spinner.component.scss']
})

export class AjaxLoadingSpinner { }