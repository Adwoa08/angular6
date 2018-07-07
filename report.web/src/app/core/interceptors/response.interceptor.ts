import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NgProgress } from '@ngx-progressbar/core';


@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

    constructor(private progressService: NgProgress) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // console.log(`ResponseInterceptor - ${req.url}`);
        
        return next.handle(req)
        .pipe(
            tap((event) => {
                if (event.type === HttpEventType.Response) {
                    this.progressService.complete();
                    // console.log(event.body);
                }
            })
        );
    }
}