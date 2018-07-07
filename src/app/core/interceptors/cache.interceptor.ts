import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { HttpCacheService } from '../http/http.cache.service';

import { NgProgress } from '@ngx-progressbar/core';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

    constructor(private progressService: NgProgress,
                private cacheService: HttpCacheService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // console.log(`CacheInterceptor - ${req.url}`);
        
        // return next.handle(req);

        // pass along non-cacheable requests
        if (req.method !== 'GET') {
            // console.log(`Invalidating cache: ${req.method} ${req.url}`);
            this.cacheService.invalidateCache();
            return next.handle(req);
        }

        // attempt to retrieve a cached response
        // const cachedResponse: HttpResponse<any> = this.cacheService.get(req.url);
         const cachedResponse: HttpResponse<any> = this.cacheService.get(req.urlWithParams);
        //  console.log(req.urlWithParams);

        // return the cached response

        if (cachedResponse) {
            console.log(`Returning a cached response: ${cachedResponse.url}`);
            // console.log(cachedResponse);
            this.progressService.complete();
            return of(cachedResponse);
        }


        // send request to server and add response to cache

        // return next.handle(req)
        // .pipe(
        //    tap((event) => {
        //        this.progressService.done();
        //        if (event instanceof HttpResponse) {
        //            console.log(`Adding item to cache: ${req.url}`);
        //            this.cacheService.put(req.url, event);
        //        }
        //    })
        // );


        return next.handle(req)
          .pipe(
            tap((event) => {
                // console.log(event);
                if (event instanceof HttpResponse) {
                // console.log(`Adding item to cache: ${req.urlWithParams}`);
                this.cacheService.put(req.urlWithParams, event);
                }
            })
          );


    }
}
