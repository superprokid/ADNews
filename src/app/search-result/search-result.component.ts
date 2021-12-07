import { Component, OnInit } from '@angular/core';
import { News } from 'src/models/news';
import { NewsService } from '../news.service';
import { Categories } from 'src/models/categories';
import { CategoriesService } from '../categories.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  newslist: News[] = [];
  categorieslist: Categories[] = []
  randomCate1?: Categories
  randomCate2?: Categories
  numberid?: number = NaN
  numberid2?: number = NaN
  newssidelist1: News[] = []
  newssidelist2: News[] = []
  datestyle ='margin-left: 1rem;color:grey;font-size:18px'
  typenewstyle = 'text-decoration:none;font-size:20px;color:#971928;font-weight:bold;line-height:40px'
  base64Data:any
  data:string = "123"

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService,
    private categoriesService: CategoriesService,
    private router: Router) { }

  ngOnInit(): void {
    this.data = this.newsService.getSearchValue()!
    this.getCategoriesFromService();
    this.getNewsFromService()
  }
  getCategoriesFromService(): void {
    this.categoriesService.getCategories().subscribe(
      (updatedCategories) => {
        this.categorieslist = updatedCategories;
        this.randomCate1 = this.categorieslist[Math.floor(Math.random() * this.categorieslist.length)]
        this.numberid = this.randomCate1.id
        this.getNewWithCategory1(this.numberid!);
        do {
          this.randomCate2 = this.categorieslist[Math.floor(Math.random() * this.categorieslist.length)]
        }
        while (this.randomCate2.id === this.randomCate1.id)
        this.numberid2 = this.randomCate2.id
        this.getNewWithCategory2(this.numberid!);
      }
    )
  }
  getNewWithCategory1(id: number): void {
    this.newsService.getNewWithCategory(id).subscribe(
      (updatedNews) => {
        this.newssidelist1 = updatedNews;
        for(let i=0;i<this.newssidelist1.length;i++){
          this.base64Data = this.newssidelist1[i].thumbnail
          this.newssidelist1[i].thumbnail = 'data:image/jpeg;base64,' + this.base64Data;
        }
      }
    )
  }
  getNewWithCategory2(id: number): void {
    this.newsService.getNewWithCategory(this.randomCate2?.id!).subscribe(
      (updatedNews) => {
        this.newssidelist2 = updatedNews;
        for(let i=0;i<this.newssidelist2.length;i++){
          this.base64Data = this.newssidelist2[i].thumbnail
          this.newssidelist2[i].thumbnail = 'data:image/jpeg;base64,' + this.base64Data;
        }
      }
    )
  }
  redirect(id: number | undefined): void {
    this.router.navigate([`/detail-content/${id}`])
  }
  redirectCate(id:number | undefined):void{
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([`/news-category/${id}`]));
  }
  getNewsFromService():void{
    this.newsService.getNewWithSearch(this.data).subscribe(
      (updatedNews) => {
        this.newslist = updatedNews
        this.codeToName();
        for(let i=0;i<this.newslist.length;i++){
          this.base64Data = this.newslist[i].thumbnail
          this.newslist[i].thumbnail = 'data:image/jpeg;base64,' + this.base64Data;
        }
        console.log(`NewList = ${JSON.stringify(this.newslist)}`);
      }
    )
  }
  codeToName():void{
    for(let i=0;i<this.newslist.length;i++){
      for(let j=0;j<this.categorieslist.length;j++){
        if(this.newslist[i].categoryCode === this.categorieslist[j].code){
          this.newslist[i].categoryCode = this.categorieslist[j].name;
        }
      }
    }
  }
}
