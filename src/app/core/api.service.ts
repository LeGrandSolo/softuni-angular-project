import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpParamsOptions,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://parseapi.back4app.com';
  contentType: string = 'application/json';
  private options: {
    headers?: HttpHeaders;
  } = {
    headers: new HttpHeaders({
      'X-Parse-Application-Id': 'nBO3OqdHvGYD3bcIJaJW5x0I4DiReq1vDjBHwHF8',
      'X-Parse-REST-API-Key': '4McJpsLCN1COi4wZNJ312qdpHKWHwK9AD7uFRXQg',
      'X-Parse-Revocable-Session': '1',
      'X-Parse-Session-Token': '',
      'Content-Type': this.contentType,
    }),
  };
  constructor(private http: HttpClient) {}
  post(url: string, body: object): Observable<Object> {
    return this.http.post(this.apiUrl + url, body, this.options);
  }
  get(
    url: string,
    data?: any,
    sessionToken?: string,
    whereParam?: boolean
  ): Observable<Object> {
    if (data) {
      if (whereParam) {
        url += `?where=${JSON.stringify(data)}`;
      } else {
        const params = new URLSearchParams(data);
        url += '?' + params;
      }
    }
    if (sessionToken) {
      this.options.headers = this.options.headers?.set(
        'X-Parse-Session-Token',
        sessionToken
      );
    }
    return this.http.get(this.apiUrl + url, this.options);
  }
  delete(url: string) {
    return this.http.delete(this.apiUrl + url, this.options);
  }
  getById(
    url: string,
    data: { [param: string]: string },
    sessionToken?: string
  ) {
    url += '?where=' + JSON.stringify(data);
    if (sessionToken) {
      this.options.headers = this.options.headers?.set(
        'X-Parse-Session-Token',
        sessionToken
      );
    }
    return this.http.get(this.apiUrl + url, this.options);
  }
  put(url: string, data: object) {
    return this.http.put(this.apiUrl + url, data, this.options);
  }
}
