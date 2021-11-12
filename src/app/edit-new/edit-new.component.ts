//@ts-nocheck

import { Component, OnInit,Input } from '@angular/core';
import { News } from 'src/models/news';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-edit-new',
  templateUrl: './edit-new.component.html',
  styleUrls: ['./edit-new.component.css']
})
export class EditNewComponent implements OnInit {
  @Input() new?:News;
  constructor(
    private route:ActivatedRoute,
    private newsService:NewsService,
    private location:Location,
  ) { }

  ngOnInit(): void {
    this.getNewsFromRoute();
  }
  getNewsFromRoute():void{
    const id = +this.route.snapshot.paramMap.get('id');
    console.log(`this.route.snapshot.paramMap = ${JSON.stringify(this.route.snapshot.paramMap)}`);

    this.newsService.getNewsWithID(id).subscribe(News => this.new = News);
  }
  save():void{
    this.newsService.updateNew(this.new).subscribe(() => this.goBack());
  }
  goBack():void {
    this.location.back();
  }

}
