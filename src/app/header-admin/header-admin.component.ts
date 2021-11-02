import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css']
})
export class HeaderAdminComponent implements OnInit {
  navstyle = 'color:#971928;font-size:25px;margin-right:30px;padding-top:2px'
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
