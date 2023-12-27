
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private router: Router, private aRoute: ActivatedRoute, public loadingController: LoadingController) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(localStorage.getItem('token')) {
      request = request.clone({
        setHeaders: {
          Authorization: `bearer ${localStorage.getItem('token')}`,
        }
      })
    } else {
      request = request.clone({
        setHeaders: {
        }
      })  
    }
    console.log("request", localStorage.getItem('token'))
    let temp = request.url.split('/')
    let loading = false
    if(temp[temp.length - 1] == 'ReadRawValues' || temp[temp.length -1] == 'ReadProcessed') {
        // console.log('000000000000000000000')
      loading = true
      this.presentLoading()
    }
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // console.log('event', event);
          // let resTemp = request.url.split('/')
          // if(resTemp[resTemp.length - 1] == 'ReadRawValues' || resTemp[resTemp.length -1] == 'ReadProcessed') {
          if(loading) {
            this.hideLoader()
          }
          // }
        }
       
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status == 401) {
          console.log('authError')
          // this.openLoginDialog()
          localStorage.removeItem('token')
          localStorage.removeItem('GroupId')
          localStorage.removeItem('UserId')
          localStorage.removeItem('query')
          localStorage.removeItem('imei')
          if (localStorage.getItem('remberMe') == 'false') {
            localStorage.removeItem('password')
            localStorage.removeItem('remberMe')
            localStorage.removeItem('userName')
          }
          this.router.navigate(['/login'], { relativeTo: this.aRoute });
          // localStorage.setItem('role', error.error['roleName'])
        }
        console.log('Interspector error', error)
        return throwError(error);
      }));
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      backdropDismiss: true
    });
    // await this.loadingController.getTop()
    await loading.present();
    // const { role, data } = await loading.onDidDismiss();
  }

  async hideLoader() {
    this.loadingController.dismiss();
  }
}
