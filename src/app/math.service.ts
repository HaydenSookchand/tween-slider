import { Injectable } from '@angular/core';

@Injectable()
export class MathService {

  constructor() { }

  cars = [
    'Ford','Chevrolet','Buick'
  ];


  myData() {
    return 'This is my data, man!';
  }
   
   getXStart(this) {
    return 0;
  }

  getYStart(this) {
    return 0;
  }

  getXCenter(this) {
    return window.innerWidth / 2;
  }

  getYCenter(this) {
    return 0;
  }

  getXEnd(this) {
    return window.innerWidth - 150;
  }

 getYEnd(this) {
      return window.innerHeight;
  }

  getWindowWidth(){
    return window.innerWidth;
  }

  getWindowHeight(){
    return window.innerHeight;
  }

}
