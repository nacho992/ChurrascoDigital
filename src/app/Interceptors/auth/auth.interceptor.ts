import { inject } from "@angular/core";
import { AuthService } from "../../services/auth/auth.service";
import { catchError, throwError } from "rxjs";
import { HttpInterceptorFn } from "@angular/common/http";
import { MessageService } from "../../services/message.service";


export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const msjService = inject(MessageService);
    const token = authService.getToken();

    if(token){
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`,
                ContentType: 'application/json',
            },
        })
    }

    return next(req).pipe(
        catchError((error) => {
            
            const codes = [401,403]

            if(codes.includes(error.status)){
                msjService.addMenssageError(error)
            }

            return throwError(()=> error)

        })
    )

  };