import { Component, OnInit } from '@angular/core';
import { News } from 'src/models/news';
import { NewsService } from '../news.service';

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
  lismall ='max-width:200px;line-height:30px;flex-direction:row;'
  carstyle ='font-weight:bold;font-size:20px'
  randomnum=randomNumber(90000000,95000000)

  newslist: News[] =[];

  constructor(private newsService:NewsService) { }

  ngOnInit(): void {
    this.getNewsFromService();
  }
  getNewsFromService():void{
    this.newsService.getNews().subscribe(
      (updatedNews) => {
        this.newslist = updatedNews;
        console.log(`this.categorieslist = ${JSON.stringify(this.newslist)}`);
      }
    )
  }

}

function randomNumber(min:number, max:number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
