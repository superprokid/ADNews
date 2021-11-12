import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { DetailContentComponent } from './detail-content/detail-content.component';
import { HomeComponent } from './home/home.component';
import { News } from 'src/models/news';
import { EditNewComponent } from './edit-new/edit-new.component';

const routes: Routes = [
  {path: "",pathMatch: "full",redirectTo: 'admin'},
  {path:"detail-content/:id",component:DetailContentComponent},
  {path: "home",component:HomeComponent},
  {path: "admin", component: AdminComponent},
  {path: "edit-new/:id",component:EditNewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
