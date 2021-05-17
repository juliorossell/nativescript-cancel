import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router, ActivationEnd } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { HttpCancelService } from './httpcancel.service';

@Injectable()
export class ManageHttpInterceptor implements HttpInterceptor {

    constructor(router: Router,
        private httpCancelService: HttpCancelService) {
            router.events.subscribe(event => {
                // An event triggered at the end of the activation part of the Resolve phase of routing.
                if (event instanceof ActivationEnd) {
                  // Cancel pending calls
                  this.httpCancelService.cancelPendingRequests();
                }
            });
    }

    intercept<T>(request: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
      // console.log('interceptor', request);
      if (request.headers && request.headers.has('cancel-http')) {
        return next.handle(request).pipe(takeUntil(this.httpCancelService.onCancelPendingRequests()))
      } else {
        return next.handle(request);
      }

    }
}
