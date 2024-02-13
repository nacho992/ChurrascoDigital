import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { ILogin } from '../../models/Interface/Login.interface';
import { LoginResponse } from '../../models/Interface/LoginResponse.Interface';
import { BehaviorSubject, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  private login$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    super(http);
  }

  public login(user: ILogin){
    try
    {
      return this.post<ILogin>(`${this._api_url}login`,user).pipe(
        take(1),
        tap( (res) => {
          if(res) this.setToken(res)
        })
      );
    }
    catch
    {
      throw 'Ha ocurrido un error'
    }
  }

  public signOut(){
    this.removeToken();
  }

  public isLoggin$(){
    this.login$.next(!!localStorage.getItem('token'));
    return this.login$.asObservable()
  }

  public isLoggin(){
    return !!localStorage.getItem('token');
  }

  public getToken(): string | null{
    return localStorage.getItem('token');
  }


  private setToken(login: LoginResponse){
    localStorage.setItem('token', login.token);
    this.login$.next(true);
  }

  private removeToken(): void {
    localStorage.removeItem('token');
    this.login$.next(false);
  }
}
