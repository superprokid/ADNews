import { Injectable } from '@angular/core';
import { Categories } from 'src/models/categories';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { catchError,map,tap } from 'rxjs/operators';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    "Authorization": 'Bearer ' + sessionStorage.getItem("token")
  })
}

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private URL="http://localhost:8081/categories";
  private URLdetail="http://localhost:8081/category";
  getCategories(): Observable<Categories[]>{
    return this.http.get<Categories[]>(this.URL).pipe(
      tap(receivedNews => console.log(`receivedNews = ${JSON.stringify(receivedNews)}`)),
      catchError(error => of([]))
    );
  }
  getCategoryWithID(id:number): Observable<Categories | undefined>{
    const url = `${this.URLdetail}/${id}`;
    return this.http.get<Categories>(url).pipe(
      tap(receivedCategory => console.log(`receivedCategory = ${JSON.stringify(receivedCategory)}`)),
      catchError(error => of(new Categories()))
    )
  }
  updateCategory(categoryupdate:Categories): Observable<any>{
    return this.http.put(`${this.URLdetail}/${categoryupdate.id}`,categoryupdate,httpOptions).pipe(
      tap(updatedCategory => console.log(`updated Category = ${JSON.stringify(updatedCategory)}`)),
      catchError(error => of(new Categories()))
    );
  }
  addCategory(categoryadd: Categories):Observable<Categories>{
    return this.http.post<Categories>(this.URLdetail,categoryadd,httpOptions).pipe(
      tap((category: Categories) => console.log(`added News = ${JSON.stringify(category)}`)),
      catchError(error => of(new Categories()))
    )
  }
  deleteCategory(deleteid: number): Observable<Categories | null>{
    const deleteURL= `${this.URLdetail}/${deleteid}`;
    return this.http.delete<Categories>(deleteURL,httpOptions).pipe(
      tap(_ => console.log(`Deleted Category with ID = ${deleteid}`)),
      catchError(() => of(null))
    );
  }
  constructor(private http:HttpClient) { }
}
