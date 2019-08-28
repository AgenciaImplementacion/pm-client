import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptorService implements HttpInterceptor {

  constructor(public toastaService: ToastrService, private router: Router) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {

      const error = err.error.message || err.statusText;

      switch (err.status) {
        case 400:
        case 401:
        case 404:
        case 422:
        case 403:
          this.toastaService.error(error)
          break;
        default:
          this.toastaService.error("No se a podido conectar con el servidor", "Actualiza la pagina")
          break;
      }

      return throwError(err);
    }));
  }
}