import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, catchError, filter, from, switchMap, take, throwError } from "rxjs";
import { AuthService } from "../services/auth/auth.service";
import { StorageService } from "../services/storage/storage.service";
import { environment } from "src/environments/environment";

@Injectable()
export class GlobalInterceptor implements HttpInterceptor {

    private refreshTokenInProgress: boolean = false;
    // Refresh Token Subject is used to queue new 401s while refresh is in progress. Once refresh succeeds pending queues subscriptions are fired with next and can be processed.
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(
        private readonly authService: AuthService,
        private readonly storageService: StorageService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        try {
                const updatedRequest = this.addAuthenticationToken(request)
                return next.handle(updatedRequest).pipe(
                    catchError((error: HttpErrorResponse) => {
                        // if ((request.url.toLowerCase().indexOf("token/v2") > -1) && (this.refreshTokenInProgress == true) && (error.status == 400)) {
                        //     this.authService.handleLogoutUser();
                        //     return throwError(() => error);
                        // }

                        console.log("error", error)

                        if (error.status == 401) {
                            return this.checkForRefreshToken(request, next);
                        } 
                        else {
                            return throwError(() => error);
                        }

                    }
                ));
        } catch (e) {
            throw e;
        }
    }

    private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
        const accessToken = this.storageService.get('accessToken');
        console.log(request, `${environment.apiBasePath}/api/v1/auth/refresh`)
        return request.clone({
            setHeaders: {
                Authorization: request.url === `${environment.apiBasePath}/api/v1/auth/refresh` ? `Bearer ${this.storageService.get('refreshToken')}` : `Bearer ${accessToken}`
            },
        });
    }

    private checkForRefreshToken(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.refreshTokenInProgress) {
            return this.refreshTokenSubject.pipe(
                filter(result => result !== null),
                take(1),
                switchMap(() => next.handle(this.addAuthenticationToken(request))),
            )
        }
        else {
            this.refreshTokenInProgress = true;
            this.refreshTokenSubject.next(null);
            
            return from(this.authService.loginWithRefreshToken()).pipe(
                switchMap(() => {
                    this.refreshTokenInProgress = false;
                    this.refreshTokenSubject.next(true);
                    return next.handle(this.addAuthenticationToken(request));
                })
            )
        }
    } 
}