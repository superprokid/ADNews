import { Component, OnInit,Input,Inject } from '@angular/core';
import { News } from 'src/models/news';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NewsService } from '../news.service';
import { Categories } from 'src/models/categories';
import { CategoriesService } from '../categories.service';
import { Router } from '@angular/router';
import { event } from 'jquery';
import { ReadVarExpr } from '@angular/compiler';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-edit-new',
  templateUrl: './edit-new.component.html',
  styleUrls: ['./edit-new.component.css','./sidebar.css']
})
export class EditNewComponent implements OnInit {
  categorieslist: Categories[] = [];
  check = false;
  new?:News;
  selectedFile?: any;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message?: string;
  imageName: any;
  preview:any
  reader = new FileReader()
  constructor(
    private route:ActivatedRoute,
    private newsService:NewsService,
    private location:Location,
    private categoriesService:CategoriesService,
    private router: Router,
    @Inject(DOCUMENT) public document: Document
  ) { }
  getCategoriesFromService():void{
    this.categoriesService.getCategories().subscribe(
      (updatedCategories) => {
        this.categorieslist = updatedCategories;
        console.log(`this.newlist = ${JSON.stringify(this.categorieslist)}`);
      }
    )
  }
  public onFileChanged(event:any) {
    if(event.target.files[0].size > 1048576){
      alert("Ảnh không được quá 1MB")
      return
    }
    this.selectedFile = event.target.files[0];
    this.reader = new FileReader();
    this.reader.readAsDataURL(event.target.files[0]); // read file as data url
    this.reader.onload = (event) => { // called once readAsDataURL is completed
      this.preview = event.target!.result;
    }
  }
  ngOnInit(): void {
    this.getCategoriesFromService()
    this.getNewsFromRoute();
  }
  getNewsFromRoute():void{
    const id = +this.route.snapshot.paramMap.get('id')!;
    console.log(`this.route.snapshot.paramMap = ${JSON.stringify(this.route.snapshot.paramMap)}`);

    this.newsService.getNewsWithID(id).subscribe(News => {this.new = News
      this.base64Data = News?.thumbnail
      //  = this.retrieveResonse.picByte;
      this.preview = 'data:image/jpeg;base64,' + this.base64Data;
      const myBlob = this.dataURItoBlob(this.base64Data)
      this.selectedFile = new File([myBlob],"preview.png",{type: 'image/png'})
    });
  }
  save():void{
    if(!this.new?.title || !this.new?.content || !this.new?.shortDescription || !this.new?.categoryCode){
      alert("Không được để trống");
      return;
    }
    for(let i=0;i<this.categorieslist.length;i++){
      if(this.new?.categoryCode === this.categorieslist[i].code){
        this.check=true;
      }
    }
    if( this.check === false){
      alert("Không có category code như trên");
      return;
    }
    // this.newsService.updateNew(this.new!).subscribe(() => this.goBack());
    let newUpdate = new FormData();
    newUpdate.append('title',this.new?.title!)
    newUpdate.append('shortDescription',this.new?.shortDescription!)
    newUpdate.append('content',this.new?.content!)
    newUpdate.append('categoryCode',this.new?.categoryCode!)
    newUpdate.append('status', this.new?.status!.toString())
    newUpdate.append("imageFile", this.selectedFile);
    this.newsService.updateNewTest(newUpdate,this.new?.id!).subscribe(() => this.goBack());
  }
  goBack():void {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([`/admin`]));
  }
  dataURItoBlob(dataURI:string) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/png' });    
    return blob;
 }
}
