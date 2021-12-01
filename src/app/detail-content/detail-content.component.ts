//@ts-nocheck

import { Component, OnInit, Input } from '@angular/core';
import { News } from 'src/models/news';
import { NewsService } from '../news.service';
import { ActivatedRoute } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';
import { Categories } from 'src/models/categories';
import { CategoriesService } from '../categories.service';

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
  numberid?: number = NaN
  newssidelist1: News[] = []
  newssidelist2: News[] = []
  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService,
    private categoriesService: CategoriesService,

  ) { }
  ngOnInit(): void {
    this.getNewsFromRoute();
    this.getCategoriesFromService();
  }
  getNewsFromRoute(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    console.log(`this.route.snapshot.paramMap = ${JSON.stringify(this.route.snapshot.paramMap)}`);
    this.newsService.getNewsWithID(id).subscribe(News => this.new = News);
    console.log(`${JSON.stringify(this.new?.content)}`);
  }
  getCategoriesFromService(): void {
    this.categoriesService.getCategories().subscribe(
      (updatedCategories) => {
        this.categorieslist = updatedCategories;
        this.randomCate1 = this.categorieslist[Math.floor(Math.random() * this.categorieslist.length)]
        this.numberid = this.randomCate1.id
        this.getNewWithCategory1(this.numberid);
        do {
          this.randomCate2 = this.categorieslist[Math.floor(Math.random() * this.categorieslist.length)]
        }
        while (this.randomCate2.id === this.randomCate1.id)
        this.numberid = this.randomCate2.id
        this.getNewWithCategory2(this.numberid);
        console.log(`this.newlist = ${JSON.stringify(this.categorieslist)}`);
      }
    )
  }
  getNewWithCategory1(id: number): void {
    this.newsService.getNewWithCategory(id).subscribe(
      (updatedNews) => {
        this.newssidelist1 = updatedNews;
        console.log(`newsidelist1 = ${JSON.stringify(this.newssidelist1)}`);
      }
    )
  }
  getNewWithCategory2(id: number): void {
    this.newsService.getNewWithCategory(this.randomCate2.id!).subscribe(
      (updatedNews) => {
        this.newssidelist2 = updatedNews;
        console.log(`this.categorieslist = ${JSON.stringify(this.newssidelist2)}`);
      }
    )
  }
  redirect(id: number | undefined): void {
    window.location.href = `/detail-content/${id}`;
  }
}
