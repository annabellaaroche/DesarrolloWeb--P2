import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpErrorResponse
} from '@angular/common/http';
import { TokenStorageService } from '../services/token-storage.service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenAuthService: TokenStorageService,
    private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const jwtHeaderToken = this.tokenAuthService.getToken();
        req = req.clone({
            setHeaders: {
                Authorization: "Bearer " + jwtHeaderToken,
            }
        });

    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse)=>{

        if(err.status == 401){
          this.router.navigateByUrl('/');
        }
        return throwError(err);
      })
    );
  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];