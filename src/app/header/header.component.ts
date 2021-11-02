import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  show: boolean = false;
  constructor(private modalService:NgbModal) { }
  openLogin(content:any) {
    this.modalService.open(content, { centered: true });
  }
  password() {
    this.show = !this.show;
  }
  ngOnInit(): void {
  }

}
