import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private mensajeOK = new Subject<string>();
  private mensajeError = new Subject<string>();


  public showMensajeOK(){
    return this.mensajeOK.asObservable()
  }

  public showMensajeError(){
    return this.mensajeError.asObservable()
  }

  public addMenssageOK(msg: string){
    this.mensajeOK.next(msg)
  }

  public addMenssageError(msg: string){
    this.mensajeError.next(msg)
  }

}
