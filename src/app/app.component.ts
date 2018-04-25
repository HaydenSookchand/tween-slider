import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers : [] 
})
export class AppComponent {
   data : Object;
  constructor(public http: HttpClient) { }

  ngOnInit(): void {
}

}


