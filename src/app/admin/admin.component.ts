import { Component, OnInit, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { News } from 'src/models/news';
import { NewsService } from '../news.service';
import { each } from 'jquery';
import { isNull } from '@angular/compiler/src/output/output_ast';

import { Categories } from 'src/models/categories';
import { CategoriesService } from '../categories.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css','./sidebar.css'],
  providers: [DecimalPipe]
})
export class AdminComponent implements OnInit {
  active='top'
  contcheck=false
  idcount=0;
  idcont: number[] = [];
  content=''
  newlist: News[] = [];
  categorieslist: Categories[] = [];
  filter = new FormControl('');
  check = false;
  constructor(private modalService:NgbModal,
    private newsService:NewsService,
    private categoriesService:CategoriesService,
    private router:Router) {
  }
  getNewsFromService():void{
    this.newsService.getNews().subscribe(
      (updatedNews) => {
        this.newlist = updatedNews;
        console.log(`this.categorieslist = ${JSON.stringify(this.newlist)}`);
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
  selectedNew?: News;
  openAdd():void {
    this.router.navigateByUrl('/add-new')
    // this.modalService.open(content, { centered: true });

  }
  ngOnInit(): void {
    this.getNewsFromService();
    this.getCategoriesFromService();
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
      this.newsService.addNews(addNews).subscribe(insertedNew => {this.newlist?.push(insertedNew)});
    }
  }
  delete(newID:number): void{
    this.newsService.deleteNews(newID).subscribe(_ => {
      this.newlist = this.newlist?.filter(eachNew => eachNew.id !== newID);
    })
  }
  count(e:Event,checkedid:number){
    const isChecked = (<HTMLInputElement>e.target).checked;
    if(isChecked===true){
      this.idcount++
      this.idcont[this.idcont.length]=checkedid;
    }
    else{
      this.idcount--
      this.idcont = this.idcont.filter(eachid => eachid !== checkedid);
    }
  }
  countall(e:Event){
    const isChecked = (<HTMLInputElement>e.target).checked;
    if(isChecked===true){
      this.idcount=this.newlist.length
      for(let i=0;i<this.idcount;i++){
          this.idcont[i]=this.newlist[i].id!;
      }
    }
    else{
      for(let i=0;i<this.idcount;i++){
        this.idcont.splice(i);
      }
      this.idcount=0
    }
  }
  deltemultiple(){
    for(let i=0;i<=this.idcount;i++){
      this.delete(this.idcont[i]);
    }
    for(let i=0;i<this.idcount;i++){
      this.idcont.splice(i);
    }
    this.idcount=0;
  }
  activeclass?: number = 0;
  onClickActive(index: number,id:number) {
    this.activeclass = index;
    this.newsService.getNewWithCategory(id).subscribe(
      (updatedNews) => {
        this.newlist = updatedNews;
        console.log(`this.categorieslist = ${JSON.stringify(this.newlist)}`);
      }
    )
  }
  onClickActiveAll(){
    this.activeclass = 0;
    this.getNewsFromService();
  }
}
