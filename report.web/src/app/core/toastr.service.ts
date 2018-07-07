import { InjectionToken } from '@angular/core';



export let TOASTR_TOKEN =  new InjectionToken<Toastr>('toastr');

export interface Toastr {
    success(msg: string, Title?: string): void;
    info(msg: string, Title?: string): void;
    warning(msg: string, Title?: string): void;
    error(msg: string, Title?: string): void;
}