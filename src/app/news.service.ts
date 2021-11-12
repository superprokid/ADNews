import { Injectable } from '@angular/core';
import { FakeNews } from './fake-news';
import { News } from 'src/models/news';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { catchError,map,tap } from 'rxjs/operators';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({"Content-Type": "application/json"})
}
@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private URL="http://springbootnews-env.eba-sexadeey.ap-southeast-1.elasticbeanstalk.com//news";
  private URLdetail="http://springbootnews-env.eba-sexadeey.ap-southeast-1.elasticbeanstalk.com//new";
  getNews(): Observable<News[]>{
    // return of(FakeNews);
    return this.http.get<News[]>(this.URL).pipe(
      tap(receivedNews => console.log(`receivedNews = ${JSON.stringify(receivedNews)}`)),
      catchError(error => of([]))
    );
  }
  getNewsWithID(id:number): Observable<News | undefined>{
    // return of(FakeNews.find(News => News.id === id))
    const url = `${this.URLdetail}/${id}`;
    return this.http.get<News>(url).pipe(
      tap(receivedNews => console.log(`receivedNews = ${JSON.stringify(receivedNews)}`)),
      catchError(error => of(new News()))
    )
  }
  updateNew(newupdate:News): Observable<any>{
    return this.http.put(`${this.URLdetail}/${newupdate.id}`,newupdate,httpOptions).pipe(
      tap(updatedNews => console.log(`updated News = ${JSON.stringify(updatedNews)}`)),
      catchError(error => of(new News()))
    );
  }
  addNews(newadd: News):Observable<News>{
    return this.http.post<News>(this.URLdetail,newadd,httpOptions).pipe(
      tap((news: News) => console.log(`added News = ${JSON.stringify(news)}`)),
      catchError(error => of(new News()))
    )
  }
  deleteNews(idlist: number[]): Observable<Object   | null>{
    const options ={
      header: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: idlist
    }

    return this.http.delete(this.URLdetail, options).pipe(
      tap(_ => console.log(`Deleted News with ID = ${idlist[0]}`)),
      catchError(() => of(null))
    )
  }

  constructor(private http:HttpClient) { 
  }

}