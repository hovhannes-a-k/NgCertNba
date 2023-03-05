import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Config} from "../config/config";

class ServiceKeyInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const request = req.clone({
      setHeaders: {
        'X-RapidAPI-Key': Config.API_KEY,
        'X-RapidAPI-Host': Config.HOST,
      }
    })

    return next.handle(request);
  }
}

export const SERVICE_KEY_INTERCEPTOR_PROVIDER = {
  provide: HTTP_INTERCEPTORS,
  useClass: ServiceKeyInterceptor,
  multi: true,
}
