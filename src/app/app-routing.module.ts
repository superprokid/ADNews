import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { DetailContentComponent } from './detail-content/detail-content.component';
import { HomeComponent } from './home/home.component';
import { News } from 'src/models/news';
import { EditNewComponent } from './edit-new/edit-new.component';
import { AdminCategoryComponent } from './admin-category/admin-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { AddNewComponent } from './add-new/add-new.component';
import { NewsByCategoryComponent } from './news-by-category/news-by-category.component';

const routes: Routes = [
  {path: "",pathMatch: "full",redirectTo: 'admin'},
  {path:"detail-content/:id",component:DetailContentComponent},
  {path: "home",component:HomeComponent},
  {path: "admin", component: AdminComponent},
  {path: "edit-new/:id",component:EditNewComponent},
  {path: "admin-category",component: AdminCategoryComponent},
  {path: "edit-category/:id",component:EditCategoryComponent},
  {path: "add-new",component:AddNewComponent},
  {path: "news-category/:id",component:NewsByCategoryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
