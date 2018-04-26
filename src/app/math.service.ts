import { Injectable } from '@angular/core';

@Injectable()
export class MathService {

  constructor() { }

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
    return window.innerHeight / 2;
  }

  getXTextCenter(this) {
    var screen = window.innerWidth;
    var textBox = (window.innerWidth * 0.7);
    var textBoxCenterX = (screen - textBox) / 2;
    return textBoxCenterX;
  }

  getYTextCenter(this) {
    var screen = window.innerHeight;
    var textBox = (window.innerHeight * 0.7);
    var textBoxCenterY =  (screen - textBox) / 2 ;
    return textBoxCenterY;
  }

  getXEnd(this) {
    return window.innerWidth - 150;
  }

  getYEnd(this) {
    return window.innerHeight;
  }

  getWindowWidth() {
    return window.innerWidth;
  }

  getWindowHeight() {
    return window.innerHeight;
  }

}
