import { environment } from './../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseService {

    constructor(private _http: HttpClient) {}

    public readonly _api_url = environment.API_URL;

    public post<T>(url: string, data: T): Observable<any> {
      return this._http.post(url, data);
    }
  
    public get<T>(url: string): Observable<T> {
      return this._http.get<T>(url);
    }
}
