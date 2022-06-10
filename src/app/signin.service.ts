import { Injectable } from '@angular/core';
import { FakeNews } from './fake-news';
import { News } from 'src/models/news';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { catchError,map,tap } from 'rxjs/operators';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  })
}
@Injectable({ providedIn: 'root' })

export class APIService{
  private URL = 'http://localhost:8081/api/auth/signin'
  signIn(body:any):Observable<any> {
    return this.http.post(this.URL, body, httpOptions).pipe()
  }
  constructor(private http:HttpClient) { 
  }
}