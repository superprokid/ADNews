import { Component, OnInit } from '@angular/core';
import { News } from 'src/models/news';
import { Location } from '@angular/common';
import { NewsService } from '../news.service';
import { Categories } from 'src/models/categories';
import { CategoriesService } from '../categories.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.css','./sidebar.css']
})
export class AddNewComponent implements OnInit {
  categorieslist: Categories[] = [];
  check = false;
  constructor(
    private router:Router,
    private newsService:NewsService,
    private location:Location,
    private categoriesService:CategoriesService
  ) { }

  ngOnInit(): void {
    this.getCategoriesFromService()
  }
  getCategoriesFromService():void{
    this.categoriesService.getCategories().subscribe(
      (updatedCategories) => {
        this.categorieslist = updatedCategories;
        console.log(`this.newlist = ${JSON.stringify(this.categorieslist)}`);
      }
    )
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
    for(let i=0;i<this.categorieslist.length;i++){
      if(categoryCode === this.categorieslist[i].code){
        this.check=true;
      }
    }
    if( this.check === false){
      alert("Không có category code như trên");
      return;
    }
    else{
      this.check=false;
      const addNews: News = new News();
      addNews.title = title;
      addNews.content = content;
      addNews.shortDescription = shortDescription;
      addNews.categoryCode = categoryCode;
      addNews.thumbnail ="";
      this.newsService.addNews(addNews).subscribe();
      window.location.href = "/admin";
    }
  }
  goBack():void{
    this.location.back();
  }
}
