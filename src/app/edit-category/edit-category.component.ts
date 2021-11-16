//@ts-nocheck

import { Component, OnInit ,Input} from '@angular/core';
import { Categories } from 'src/models/categories';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CategoriesService } from '../categories.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css','./sidebar.css']
})
export class EditCategoryComponent implements OnInit {
  @Input() category?:Categories;
  constructor(
    private route:ActivatedRoute,
    private categoryService:CategoriesService,
    private location:Location,
  ) { }

  ngOnInit(): void {
    this.getCategoryFromRoute();
  }
  getCategoryFromRoute():void{
    const id = +this.route.snapshot.paramMap.get('id');
    console.log(`this.route.snapshot.paramMap = ${JSON.stringify(this.route.snapshot.paramMap)}`);
    this.categoryService.getCategoryWithID(id).subscribe(Categories => this.category = Categories);
  }
  save():void{
    this.categoryService.updateCategory(this.category).subscribe(() => this.goBack());
  }
  goBack():void {
    this.location.back();
  }
}
