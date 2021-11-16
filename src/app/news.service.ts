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
  private URL="http://localhost:8081/news";
  private URLdetail="http://localhost:8081/new";
  private URLcategory="http://localhost:8081/category";
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
  deleteNews(deleteid: number): Observable<News | null>{
    const deleteURL= `${this.URLdetail}/${deleteid}`;
    return this.http.delete<News>(deleteURL,httpOptions).pipe(
      tap(_ => console.log(`Deleted News with ID = ${deleteid}`)),
      catchError(() => of(null))
    );
  }
  getNewWithCategory(idget:number): Observable<News[]>{
    const getNewURL = `${this.URLcategory}/${idget}/news`;
    return this.http.get<News[]>(getNewURL).pipe(
      tap(receivedNews => console.log(`receivedNews = ${JSON.stringify(receivedNews)}`)),
      catchError(error => of([]))
    );
  }

  constructor(private http:HttpClient) { 
  }

}