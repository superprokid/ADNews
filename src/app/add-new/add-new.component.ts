import { Component, OnInit,Inject } from '@angular/core';
import { News } from 'src/models/news';
import { Location } from '@angular/common';
import { NewsService } from '../news.service';
import { Categories } from 'src/models/categories';
import { CategoriesService } from '../categories.service';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.css','./sidebar.css']
})
export class AddNewComponent implements OnInit {
  cate_code = ""
  categorieslist: Categories[] = [];
  check = false;
  selectedFile?: any;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message?: string;
  imageName: any;
  preview:any
  constructor(
    private router:Router,
    private newsService:NewsService,
    private location:Location,
    private categoriesService: CategoriesService,
    @Inject(DOCUMENT) public document: Document
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
  public onFileChanged(event:any) {
    if(event.target.files[0].size > 1048576){
      alert("Ảnh không được quá 1MB!")
      return
    }
    this.selectedFile = event.target.files[0];
    var reader = new FileReader();

    reader.readAsDataURL(event.target.files[0]); // read file as data url

    reader.onload = (event) => { // called once readAsDataURL is completed
      this.preview = event.target!.result;
    }
  }
  add(title:string,author:string,content:string,shortDescription:string){
    title = title.trim();
    author = author.trim()
    content = content.trim();
    shortDescription = shortDescription.trim();
    let categoryCode = this.cate_code;

    if(!title || !author || !content || !shortDescription || !categoryCode){
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
      // const addNews: News = new News();
      // addNews.title = title;
      // addNews.content = content;
      // addNews.shortDescription = shortDescription;
      // addNews.categoryCode = categoryCode;
      // addNews.thumbnail ="";
      // this.newsService.addNews(addNews).subscribe();
      let newAdd = new FormData();
      newAdd.append('title', title)
      newAdd.append('author',author)
      newAdd.append('shortDescription',shortDescription)
      newAdd.append('content',content)
      newAdd.append('categoryCode',categoryCode)
      newAdd.append("imageFile", this.selectedFile);
      this.newsService.addNewsTest(newAdd).subscribe(() => this.goBack());
    }
  }
  goBack():void{
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate([`/admin`])
    );
  }
}
