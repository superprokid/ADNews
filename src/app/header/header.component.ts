import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Categories } from 'src/models/categories';
import { CategoriesService } from '../categories.service';
import { NewsService } from '../news.service';
import { Router } from '@angular/router';
import { APIService } from '../signin.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  navstyle = 'color:#971928;font-size:25px;margin-right:30px;'
  content=''
  hothover=true;
  dayhover=true;
  presses=true;
  show: boolean = false;
  categorieslist: Categories[] = [];
  login=false;
  searchValue:string = ""
  constructor(private modalService:NgbModal,
    private categoriesService:CategoriesService,
    private router:Router,
    private newsService: NewsService,
    private apiService: APIService
    ) { }
  openLogin(content:any) {
    this.modalService.open(content, { centered: true });
  }
  password() {
    this.show = !this.show;
  }
  ngOnInit(): void {
    this.getCategoriesFromService();
  }
  redirect(id: number | undefined): void {
    window.location.href = `/news-category/${id}`;
  }
  getCategoriesFromService():void{
    this.categoriesService.getCategories().subscribe(
      (updatedCategories) => {
        this.categorieslist = updatedCategories;
        console.log(`this.newlist = ${JSON.stringify(this.categorieslist)}`);
      }
    )
  }
  redirectTo(uri:string,id:number | undefined){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([`${uri}/${id}`]));
 }
 logOut(){
    this.login=false
 }
 logIn(username: string, password: string) {
    let body = {
      "username": username,
      "password": password
    }
    this.apiService.signIn(body).subscribe((response) => {
      sessionStorage.setItem("token", response.accessToken)
      if (response.roles[0] == 'ROLE_ADMIN') {
        this.router.navigate([`/admin`]);
      }
      else {
        this.modalService.dismissAll()
      }
    }, error => {
      alert("Sai mật khẩu")
    }
   )
  } 
  search(){
    console.log(this.searchValue)
    this.newsService.setSearchValue(this.searchValue)
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([`/search-result`]))
  }
}
