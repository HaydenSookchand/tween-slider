import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MathService } from './math.service';

@Injectable()

export class DimensionService {

  canShowPositions: Boolean;

  constructor(public http: HttpClient, private mathService: MathService) {
    this.canShowPositions = true;
  }


  init(){
    this.createDimensionBindings();
    this.showOverlay();
  }

  createDimensionBindings(this) {
    this.topLeftDiv = document.getElementById('top-left');
    this.topRightDiv = document.getElementById('top-right');
    this.bottomLeftDiv = document.getElementById('bottom-left');
    this.bottomRightDiv = document.getElementById('bottom-right');
  }

  showOverlay(this) {
    if (this.canShowPositions) {
      this.topLeftDiv.innerHTML = " y = " + 0 + " , x = " + 0;
      this.topLeftDiv.style.left = "0px";
      this.topLeftDiv.style.top = "0px";
      this.topLeftDiv.style.display = "block";

      this.topRightDiv.innerHTML = " y = " + 0 + " , x = " + this.mathService.getWindowWidth();
      this.leftvalue = this.mathService.getXEnd() + 50;
      this.topRightDiv.style.left = this.leftvalue + "px";
      this.topRightDiv.style.top = "0px";
      this.topRightDiv.style.display = "block";

      this.bottomRightDiv.innerHTML = " y = " + this.mathService.getYEnd() + " , x = " + 0;
      this.bottomvalue = this.mathService.getYEnd() - 100;
      this.bottomRightDiv.style.top = this.bottomvalue + "px";
      this.bottomRightDiv.style.left = "0px";
      this.bottomRightDiv.style.display = "block";

      this.bottomLeftDiv.innerHTML = " y = " + this.mathService.getYEnd() + " , x = " + this.mathService.getWindowWidth();
      this.bottomvalue = this.mathService.getYEnd() - 100;
      this.leftvalue = this.mathService.getXEnd() + 50;
      this.bottomLeftDiv.style.top = this.bottomvalue + "px";
      this.bottomLeftDiv.style.left = this.leftvalue + "px";
      this.bottomLeftDiv.style.display = "block";
    }
  }
}
