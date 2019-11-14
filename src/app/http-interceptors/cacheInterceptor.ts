import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders, HttpEvent } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  
  constructor(private http: HttpClient){

  }

  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
  //   const jwt = localStorage.getItem('id_token');
  //   if (jwt !== "false") {
  //     req = req.clone({
  //       setHeaders:{
  //         Authorization : `Bearer ${jwt}`
  //       }
  //     });
  //   }
    
    
  //   return next.handle(req);
  // }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const httpRequest = req.clone({
      headers: new HttpHeaders({
        'Accept': 'application/json; odata=verbose',
        'Content-Type': 'application/json'
      })
    });

    return next.handle(httpRequest);
  }
}