import { Component, OnInit } from '@angular/core';
import { News } from 'src/models/news';
import { NewsService } from '../news.service';
import { Categories } from 'src/models/categories';
import { CategoriesService } from '../categories.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  listnewstyle = 'text-decoration:none;font-size:20px;color:black;line-height:25px'
  typenewstyle = 'text-decoration:none;font-size:20px;color:#971928;font-weight:bold;line-height:40px'
  listnewstyle2 = 'text-decoration:none;font-size:15px;color:#00254d;line-height:25px'
  typenewstyle2 = 'text-decoration:none;font-size:15px;color:#001833;font-weight:bold;line-height:40px'
  datestyle ='margin-left: 1rem;color:grey;font-size:18px'
  mb20 = 'margin-bottom:20px'
  carstyle ='font-weight:bold;font-size:20px'
  randomnum=randomNumber(90000000,95000000)
  categorieslist: Categories[] =[];
  newslist: News[] =[];

  constructor(private newsService:NewsService,private categoriesService:CategoriesService) { }

  ngOnInit(): void {
    this.getCategoriesFromService();
    this.getNewsFromService();
  }
  getNewsFromService():void{
    this.newsService.getNews().subscribe(
      (updatedNews) => {
        this.newslist = updatedNews;
        this.codeToName();
        console.log(`this.categorieslist = ${JSON.stringify(this.newslist)}`);
      }
    )
  }
  getCategoriesFromService():void{
    this.categoriesService.getCategories().subscribe(
      (updatedCategories) => {
        this.categorieslist = updatedCategories;
        console.log(`this.newlist = ${JSON.stringify(this.categorieslist)}`);
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

function randomNumber(min:number, max:number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
