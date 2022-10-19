import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpEvent,
  HttpHandler,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { EncryptService } from './encrypt.service';
import { environment } from '../../environments/environment';
import { Observable, Subscription, throwError } from 'rxjs';
import { map, tap, first, catchError } from 'rxjs/operators';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToasterService } from './toaster.service';
import { UtilityService } from './utility.service';
// import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  apiCount: number = 0;
  sessionTimeoutCount: number = 0;

  constructor(
    private encrytionService: EncryptService,
    private ngxUiLoaderService: NgxUiLoaderService,
    private toasterService: ToasterService,
    private utilityService: UtilityService
  ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // this.ngxUiLoaderService.start();
    this.apiCount++;
    let httpMethod = req.method;

    const reqBody = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    if (reqBody && reqBody.showLoader !== false && reqBody.processId != 'acc5316837e611ed8c760242ac110002') {
      console.log('testing', reqBody)
      this.ngxUiLoaderService.start();
    }


    console.log('Before Encryption', req.body);
    console.log('req', req);

    let token = '';

    if (reqBody && reqBody.headers !== undefined) {
      token = reqBody.headers;
    } else if (reqBody) {
      token = localStorage.getItem('token')
        ? localStorage.getItem('token')
        : ''
    }


    let uri = environment.host + environment.appiyoDrive;
    if (!req.headers.has('Content-Type') && req.url !== uri) {
      if (httpMethod == 'POST' || httpMethod == 'PUT') {
        if (req.url.includes('appiyo')) {
          if (environment.encryptionType == true) {
            const encryption = this.encrytionService.encrypt(
              JSON.stringify(req.body),
              environment.aesPublicKey
            );
            req = req.clone({
              setHeaders: encryption.headers,
              body: encryption.rawPayload,
              responseType: 'text',
            });
          }
        }
      } else {
        req = req.clone({
          setHeaders: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'authentication-token': localStorage.getItem('token')
              ? localStorage.getItem('token')
              : '',
          },
        });
      }
    }

    let authReq;
    if (req.url.includes('appiyo')) {
      authReq = req.clone({
        headers: req.headers.set(
          'authentication-token',
          localStorage.getItem('token')
            ? localStorage.getItem('token') : ''
        ),
        //     .set('X-AUTH-SESSIONID',
        //      localStorage.getItem('X-AUTH-SESSIONID') ?
        //      localStorage.getItem('X-AUTH-SESSIONID').trim() : '')
      });
    } else {
      authReq = req;
    }
    console.log('authReq', req);
    return next.handle(authReq).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status != 200) {
            console.log('httpErr', err);
            this.ngxUiLoaderService.stop();
            if (err.status != 401 && err.status != 500) {
              if (err.status === 0) {
                // this.toasterService.showError(`${err.status}: Connection not available! Please try again later.`, 'Technical error..');
              } else {
                // this.toasterService.error(`${err.status}: ${err.statusText}`, 'Technical error..');
              }
            }
          }
        }
        return throwError(err);
      }),
      map(
        (event: HttpEvent<any>) => {
          let res;
          const sesstionSubcribe: Subscription = this.utilityService.sessionTimeOut$.subscribe(data => this.sessionTimeoutCount = data);
          this.apiCount--;
          if (event instanceof HttpResponse) {
            if (event.headers.get('content-type') == 'text/plain') {
              event = event.clone({
                body: JSON.parse(this.encrytionService.decryptResponse(event)),
              });
              res = event.body;
            } else {
              if (
                event.headers.get('content-type') != 'text/plain' &&
                event.headers.get('content-type') != "text/html" &&
                typeof event.body != 'object'
              ) {
                res = JSON.parse(event.body);
              }
              if (res && res['login_required']) {
                if (this.sessionTimeoutCount === 0) {
                  this.toasterService.showError('Session Expired.Please Login Again', '');
                  this.sessionTimeoutCount++;
                  this.utilityService.setSessionTimeOut(this.sessionTimeoutCount);
                }
                sesstionSubcribe.unsubscribe();
                this.utilityService.logOut();
                // this.utilityService.removeAllLocalStorage();
              }
            }
            console.log('after Encryption: ', event.body);

            if (res && res['Error'] === '1') {
              alert(res['ErrorMessage']);
            }
            // this.ngxUiLoaderService.stop();
            this.checkApiCount();
            return event;
          } else {
            // this.ngxUiLoaderService.stop();
            console.log('authenticateErrorevent', event);
          }
        },
        (err: any) => {
          console.log('authenticateError', err);
          this.checkApiCount();
        }
      )

    );


  }

  checkApiCount() {
    if (this.apiCount <= 0) {
      console.log('this.apiCount', this.apiCount)
      this.ngxUiLoaderService.stop();
    }
  }
}

