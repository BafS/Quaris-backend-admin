import {Injectable} from '@angular/core';
import {
  Http,
  Headers,
  // Response,
  RequestOptions
} from '@angular/http';

@Injectable()
export class HttpClient {

  private API_PATH: string = 'http://localhost:8090/api';

  private token: string;

  constructor(private http: Http) {}

  setToken(token: string) {
    this.token = token;
  }

  removeToken() {
    this.token = null;
  }

  checkToken() {
    if (!this.token) {
      if (window.localStorage && window.localStorage.getItem('token')) {
        this.token = window.localStorage.getItem('token');

        return true;
      }
    }

    return false;
  }

  private getOptions() {
    let headers = new Headers({
      'Content-Type': 'application/json',
    });

    this.checkToken();

    if (this.token) {
      headers.append('Authorization', this.token);
    }

    console.info(headers);


    return new RequestOptions({ headers });
  }

  get(url: string) {
    return this.http.get(this.API_PATH + url, this.getOptions());
  }

  post(url: string, data?: Object) {
    return this.http.post(this.API_PATH + url, data, this.getOptions());
  }

  put(url: string, data?: Object) {
    return this.http.put(this.API_PATH + url, data, this.getOptions());
  }
}
