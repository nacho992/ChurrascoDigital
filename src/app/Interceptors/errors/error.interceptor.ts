import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { MessageService } from '../../services/message.service';
import { inject } from '@angular/core';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const msjService = inject(MessageService);
  return next(req).pipe(catchError(error => handleErrorResponse(error,msjService)));
};

function handleErrorResponse(error: HttpErrorResponse,msjService: MessageService){
  //notificar
  console.log('error',error)
  var msj = 'Ha ocurrido un error'
  const codes = [401,403,400]
  if(codes.includes(error.status)) msj = error.error.msg ?? msj
  msjService.addMenssageError(msj)
  return throwError(() => error)
}