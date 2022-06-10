import { Component,Input, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Categories } from 'src/models/categories';
import { CategoriesService } from '../categories.service';
import { News } from 'src/models/news';
import { NewsService } from '../news.service';

import { each } from 'jquery';
import { isNull } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css','./sidebar.css']
})
export class AdminCategoryComponent implements OnInit {
  active = 'top'
  selectedValue:any
  contcheck=false
  idcount=0;
  idcont: number[] = [];
  content=''
  categorieslist: Categories[] = [];
  newslist:News[] = [];
  filter = new FormControl('');
  deleteCate?: Categories;
  category?: Categories;
  number_news = 0;
  constructor(private modalService:NgbModal,
    private categoriesService:CategoriesService,
    private newsService: NewsService) {
  }
  getCategoriesFromService():void{
    this.categoriesService.getCategories().subscribe(
      (updatedCategories) => {
        this.categorieslist = updatedCategories;
        console.log(`this.newlist = ${JSON.stringify(this.categorieslist)}`);
      }
    )
  }
  getNewsFromService():void{
    this.newsService.getNews().subscribe(
      (updatedNews) => {
        this.newslist = updatedNews;
        console.log(`this.categorieslist = ${JSON.stringify(this.newslist)}`);
      }
    )
  }
  openAdd(content:any):void {
    this.modalService.open(content, { centered: true });
  }
  ngOnInit(): void {
    this.getNewsFromService()
    this.getCategoriesFromService()
  }

  add(name:string,code:string){
    name = name.trim();
    code = code.trim();
    if(!name || !code){
      alert("Không được để trống");
      return;
    }
    for(let i=0;i<this.categorieslist.length;i++){
      if(code === this.categorieslist[i].code){
        alert("Bị trùng code");
        return;
      }
    }
    const addCategory: Categories = new Categories();
    addCategory.name = name;
    addCategory.code = code;
    this.categoriesService.addCategory(addCategory).subscribe(insertedCategory => {this.categorieslist.push(insertedCategory)});
  }
  delete(cateID:number): void{
    for(let i=0;i<this.categorieslist.length;i++){
        if(cateID === this.categorieslist[i].id){
          this.deleteCate = this.categorieslist[i]
          break
        }
    }
    for(let i=0;i<this.newslist.length;i++){
      if(this.deleteCate?.code === this.newslist[i].categoryCode){
        alert("Có News dính với Cate này!")
        return;
      }
    }
    this.categoriesService.deleteCategory(cateID).subscribe(_ => {
      this.categorieslist = this.categorieslist?.filter(eachCategory => eachCategory.id !== cateID);
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
      this.idcount=this.categorieslist.length
      for(let i=0;i<this.idcount;i++){
          this.idcont[i]=this.categorieslist[i].id!;
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
  onClickActive(index: number) {
    this.activeclass = index;
  }
  changeStatus(num: number) {
    this.category!.status = num
  }
  // editCate(cateEdit : Categories,index:number) {
  //   this.category = cateEdit
  //   let row = document.getElementsByClassName("item_value")
  //   for (let i = 0; i < row.length; i++){
  //     row[i].classList.add('disable')
  //   }
  // }
  editCate() {
    for (let i = 0; i < this.categorieslist.length; i++)
      if (this.selectedValue == this.categorieslist[i].code) {
        this.category = this.categorieslist[i]
        break
      }
    this.newsService.getNewWithCategory(this.category?.id!).subscribe(response => this.number_news = response.length )
  }
  goBack() {
    this.category = undefined
    let row = document.getElementsByClassName("item_value")
    for (let i = 0; i < row.length; i++){
      row[i].classList.remove('disable')
    }
  }
  saveCate() {
    this.categoriesService.updateCategory(this.category!).subscribe();
    this.category = undefined
    let row = document.getElementsByClassName("item_value")
    for (let i = 0; i < row.length; i++){
      row[i].classList.remove('disable')
    }
  }
}
