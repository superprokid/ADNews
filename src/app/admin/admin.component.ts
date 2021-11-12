import { Component, OnInit, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FakeNews } from '../fake-news';
import { News } from 'src/models/news';
import { NewsService } from '../news.service';
import { each } from 'jquery';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [DecimalPipe]
})
export class AdminComponent implements OnInit {
  active='top'
  contcheck=false
  usercheck=false
  content=''
  newlist?: News[];
  filter = new FormControl('');
  constructor(private modalService:NgbModal,private newsService:NewsService) {
  }
  getNewsFromService():void{
    this.newsService.getNews().subscribe(
      (updatedNews) => {
        this.newlist = updatedNews;
        console.log(`this.newlist = ${JSON.stringify(this.newlist)}`);
      }
    )
  }

  selectedNew?: News;
  openAdd(content:any):void {
    this.modalService.open(content, { centered: true });
  }
  ngOnInit(): void {
    this.getNewsFromService();
  }

  add(title:string,content:string,shortDescription:string,categoryCode:string,thumbnail:string){
    title = title.trim();
    content = content.trim();
    shortDescription = shortDescription.trim();
    categoryCode = categoryCode.trim();
    if(!title || !content || !shortDescription || !categoryCode){
      alert("Không được để trống");
      return;
    }
    const addNews: News = new News();
    addNews.title = title;
    addNews.content = content;
    addNews.shortDescription = shortDescription;
    addNews.categoryCode = categoryCode;
    addNews.thumbnail ="";
    this.newsService.addNews(addNews).subscribe(insertedNew => {this.newlist?.push(insertedNew)});
  }
//   test:number[] =[1,2]
//   transfer:number[] =[]
//   Delete() :void {
//     this.test.forEach((element,i) => {
//       this.newsService.deleteNews(this.transfer).subscribe(_ =>{
//         this.newlist = this.newlist?.filter((eachNews) =>eachNews.id !== element);
//         this.transfer[i] = this.newlist[1].id
//     });
//   })
// }
}
