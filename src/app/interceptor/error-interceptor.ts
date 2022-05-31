import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ErrorInterceptor implements HttpInterceptor {
  constructor() {}
  // Intercept the request and handle the error.
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        return this.handleHttpError(error);
      })
    );
  }

  // If we receive a 404 error, return the error object included in the response.
  private handleHttpError(error: HttpErrorResponse) {
    if (error.status === 404) {
      return throwError(error.error);
    } else {
      return throwError(error);
    }
  }
}
