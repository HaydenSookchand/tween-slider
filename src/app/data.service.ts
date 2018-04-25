import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {

  slideData: Object;
  constructor(public http: HttpClient) { }


 getData(this) {
   
     this.http.get('./assets/configs/demo.json').subscribe(data => {
        this.slideData = data;
     }).then (this.slideData) 
     ;

   
 } 





}
