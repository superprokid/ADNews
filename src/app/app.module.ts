import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HeaderAdminComponent } from './header-admin/header-admin.component';
import { DetailContentComponent } from './detail-content/detail-content.component';
import { HttpClientModule } from '@angular/common/http';
import { EditNewComponent } from './edit-new/edit-new.component';
import { NewsService } from './news.service';
import { AdminCategoryComponent } from './admin-category/admin-category.component';
import { CategoriesService } from './categories.service';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { AddNewComponent } from './add-new/add-new.component';
import { LineBreakPipe } from './line-break.pipe';
import { NewsByCategoryComponent } from './news-by-category/news-by-category.component';

  
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    HeaderComponent,
    FooterComponent,
    HeaderAdminComponent,
    DetailContentComponent,
    EditNewComponent,
    AdminCategoryComponent,
    EditCategoryComponent,
    AddNewComponent,
    LineBreakPipe,
    NewsByCategoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    NewsService,
    CategoriesService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

