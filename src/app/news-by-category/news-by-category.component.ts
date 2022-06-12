//@ts-nocheck

import { Component, OnInit } from '@angular/core';
import { News } from 'src/models/news';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../news.service';
import { Categories } from 'src/models/categories';
import { CategoriesService } from '../categories.service';
import { Router } from '@angular/router';
import {Location} from '@angular/common'
@Component({
  selector: 'app-news-by-category',
  templateUrl: './news-by-category.component.html',
  styleUrls: ['./news-by-category.component.css']
})
export class NewsByCategoryComponent implements OnInit {
  newlist?: News[];
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
  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private newsService: NewsService,
    private categoriesService: CategoriesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCategoriesFromService();
  }
  getCategoriesFromService(): void {
    this.categoriesService.getCategories().subscribe(
      (updatedCategories) => {
        for (let idx = 0; idx < updatedCategories.length; idx++){
          if (updatedCategories[idx].status == 0) {
            updatedCategories.splice(idx, 1)
            idx--
          }
        }
        this.categorieslist = updatedCategories;
        const id = +this.route.snapshot.paramMap.get('id')!;
        let exits = false
        for (let i = 0; i < this.categorieslist.length; i++){
          if (this.categorieslist[i].id == id && this.categorieslist[i].status != 0) {
            exits = true
          }
        }
        if (exits == false){
          this.location.back()
        }
        this.randomCate1 = this.categorieslist[Math.floor(Math.random() * this.categorieslist.length)]
        this.numberid = this.randomCate1.id
        this.getNewWithCategory1(this.numberid!);
        do {
          this.randomCate2 = this.categorieslist[Math.floor(Math.random() * this.categorieslist.length)]
        }
        while (this.randomCate2.id === this.randomCate1.id)
        this.numberid2 = this.randomCate2.id
        this.getNewWithCategory2(this.numberid!);
        this.getNewsFromRoute()
      }
    )
  }
  search(nameKey:any, myArray: Categories[]){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].code === nameKey) {
            return true
        }
    }
    return false
}
  getNewWithCategory1(id: number): void {
    this.newsService.getNewWithCategory(id).subscribe(
      (updatedNews) => {
        for (let idx = 0; idx < updatedNews.length; idx++){
          if (updatedNews[idx].status == 0) {
            updatedNews.splice(idx, 1)
            idx--
          }
        }
        this.newssidelist1 = updatedNews.reverse();
        for(let i=0;i<this.newssidelist1.length;i++){
          this.base64Data = this.newssidelist1[i].thumbnail
          this.newssidelist1[i].thumbnail = 'data:image/jpeg;base64,' + this.base64Data;
        }
        console.log(`newsidelist1 = ${JSON.stringify(this.newssidelist1)}`);
      }
    )
  }
  getNewWithCategory2(id: number): void {
    this.newsService.getNewWithCategory(this.randomCate2?.id!).subscribe(
      (updatedNews) => {
        for (let idx = 0; idx < updatedNews.length; idx++){
          if (updatedNews[idx].status == 0) {
            updatedNews.splice(idx, 1)
            idx--
          }
        }
        this.newssidelist2 = updatedNews.reverse();
        for(let i=0;i<this.newssidelist2.length;i++){
          this.base64Data = this.newssidelist2[i].thumbnail
          this.newssidelist2[i].thumbnail = 'data:image/jpeg;base64,' + this.base64Data;
        }
        console.log(`this.categorieslist = ${JSON.stringify(this.newssidelist2)}`);
      }
    )
  }
  getNewsFromRoute(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    
    console.log(`this.route.snapshot.paramMap = ${JSON.stringify(this.route.snapshot.paramMap)}`);
    this.newsService.getNewWithCategory(id).subscribe(
      (newslist) => {
        for (let idx = 0; idx < newslist.length; idx++){
          let isExits = this.search(newslist[idx].categoryCode, this.categorieslist)
          if (newslist[idx].status == 0 || !isExits) {
            newslist.splice(idx, 1)
            idx--
          }
        }
        this.newlist = newslist;
        this.codeToName();
        for(let i=0;i<this.newlist.length;i++){
          this.base64Data = this.newlist[i].thumbnail
          this.newlist[i].thumbnail = 'data:image/jpeg;base64,' + this.base64Data;
        }
        console.log(`this.categorieslist = ${JSON.stringify(this.newlist)}`);
      }
    )
  }
  codeToName():void{
    for(let i=0;i<this.newlist?.length!;i++){
      for(let j=0;j<this.categorieslist.length;j++){
        if(this.newlist[i].categoryCode === this.categorieslist[j].code){
          this.newlist[i].categoryCode = this.categorieslist[j].name;
        }
      }
    }
  }
  redirect(id: number | undefined): void {
    this.router.navigate([`/detail-content/${id}`])
  }
  redirectCate(id:number | undefined):void{
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([`/news-category/${id}`]));
  }
}
