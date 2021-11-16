import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Categories } from 'src/models/categories';
import { CategoriesService } from '../categories.service';


import { each } from 'jquery';
import { isNull } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css','./sidebar.css']
})
export class AdminCategoryComponent implements OnInit {
  active='top'
  contcheck=false
  idcount=0;
  idcont: number[] = [];
  content=''
  categorieslist: Categories[] = [];
  filter = new FormControl('');
  constructor(private modalService:NgbModal,private categoriesService:CategoriesService) {
  }
  getCategoriesFromService():void{
    this.categoriesService.getCategories().subscribe(
      (updatedCategories) => {
        this.categorieslist = updatedCategories;
        console.log(`this.newlist = ${JSON.stringify(this.categorieslist)}`);
      }
    )
  }
  openAdd(content:any):void {
    this.modalService.open(content, { centered: true });
  }
  ngOnInit(): void {
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
  delete(newID:number): void{
    this.categoriesService.deleteCategory(newID).subscribe(_ => {
      this.categorieslist = this.categorieslist?.filter(eachCategory => eachCategory.id !== newID);
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
}
