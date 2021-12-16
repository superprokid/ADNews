//@ts-nocheck

import { Component, OnInit, Input } from '@angular/core';
import { News } from 'src/models/news';
import { NewsService } from '../news.service';
import { ActivatedRoute } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';
import { Categories } from 'src/models/categories';
import { CategoriesService } from '../categories.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-content',
  templateUrl: './detail-content.component.html',
  styleUrls: ['./detail-content.component.css']
})
export class DetailContentComponent implements OnInit {
  @Pipe({ name: 'replaceLineBreaks' })
  new?: News;
  categorieslist: Categories[] = []
  randomCate1?: Categories
  randomCate2?: Categories
  randomid?: number = NaN
  base64Data:any
  numberid?: number = NaN
  numberid2?: number = NaN
  newssidelist1: News[] = []
  newssidelist2: News[] = []
  newsindetail: News[] = []
  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService,
    private categoriesService: CategoriesService,
    private router:Router

  ) { }
  ngOnInit(): void {
    this.getRandomNews();
    this.getNewsFromRoute();
    this.getCategoriesFromService();
  }
  getNewsFromRoute(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.newsService.getNewsWithID(id).subscribe(News => {
      this.new = News
      this.base64Data = News?.thumbnail
      this.new?.thumbnail = 'data:image/jpeg;base64,' + this.base64Data;
    });
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
        this.newssidelist1 = updatedNews.reverse();
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
        this.newssidelist2 = updatedNews.reverse();
        for(let i=0;i<this.newssidelist2.length;i++){
          this.base64Data = this.newssidelist2[i].thumbnail
          this.newssidelist2[i].thumbnail = 'data:image/jpeg;base64,' + this.base64Data;
        }
      }
    )
  }
  redirect(id: number | undefined): void {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([`/detail-content/${id}`]));
  }
  getRandomNews():void{
    this.newsService.getNews().subscribe(
      (News) => {
        while (this.newsindetail.length <3){
          this.newsindetail.push(News[Math.floor(Math.random() * this.categorieslist.length)]!)
          for(let i=0;i<this.newsindetail.length-1;i++){
              if(this.newsindetail[this.newsindetail.length-1].id === this.newsindetail[i].id){
                this.newsindetail.pop()
              }
          }
          console.log(`cai nay la detail news: ${this.newsindetail[3].title}`)
        }
      }
    )

  }
  redirectCate(id:number | undefined):void{
    this.router.navigate([`/news-category/${id}`]);
  }
}
