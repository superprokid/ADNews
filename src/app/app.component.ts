import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private apiURL = 'http://localhost:8081/new?page=1&limit=2'
  title = 'ADNews';
  // navstyle = 'color:#971928;font-size:25px;margin-right:30px;padding-top:2px'
  // hothover=true;
  // dayhover=true;
}
