import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable} from 'rxjs';
import { NgProgress } from '@ngx-progressbar/core';


@Injectable()
export class AddHeadersInterceptor implements HttpInterceptor {

    constructor(private progressService: NgProgress) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.progressService.start();
        const modifiedReq = req.clone({
            setHeaders: { 'Content-Type': 'application/json' }
        });

        return next.handle(modifiedReq);

    }
}