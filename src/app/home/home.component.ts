import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { TweenLite, TimelineMax } from 'gsap';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: []
})
export class HomeComponent {
  textAnimation: Object;
  items: Array<Object>
  profileData: Object;
  xTo: Number;
  yTo: Number;
  xEnd: Number;
  xPer: Number;

  constructor(public http: HttpClient) { }

  ngOnInit(): void {

    this.http.get('./assets/configs/home.json').subscribe(data => {
      this.profileData = data;
    });

    //Timeout is allowing for angular to create the divs from data in the json file
    var that = this;
    setTimeout(() => {
      this.init();
    }, 100);
  }

  init() {
    this.bindToElements();
    this.setUpAnimations();
    //this.someCalculations();
    this.playAnimations();
  }

  /** ***************************** Bind and Setup ***************************************************/

  bindToElements(this) {
    this.createSlideBindings();
  }

  createSlideBindings(this) {
    this.items = [];
    for (var configItem = 0; configItem < this.profileData.length; configItem++) {
      this.items[configItem] = document.getElementById(this.profileData[configItem].id);
    }
  }

  setUpAnimations() {
    this.textAnimation = new TimelineMax({ repeat: -1 });
  }

  /** ***************************** Play Animations ***************************************************/

  playAnimations(this) {
    this.playSlideAnimations();
  }


  playSlideAnimations(this) {
    for (var itemCounter = 0; itemCounter < this.items.length; itemCounter++) {
      this.count = itemCounter;
      this.validateAnimations(this, this.profileData[this.count]);
      this.xPercent = -50
      this.textAnimation.fromTo(this.items[itemCounter], 1, { opacity: 0, x: 0, y: 0, xPercent: this.xPercent }, { opacity: 1, x: this.firstAnimEndX, y: this.firstAnimEndY, xPercent: this.xPercent });
      this.textAnimation.to(this.items[itemCounter], 1, { opacity: 0, x: this.secondAnimEndX, y: this.secondAnimEndY, }, this.profileData[itemCounter].timeToFade);
    }
  }



  /** ***************************** Reset Animations ***************************************************/
  validateAnimations(this) {

    // This needs to be sorted out 

    this.firstAnimEndX = this.profileData[this.count].firstAnimEndX;
    if (this.firstAnimEndX != undefined) {
      switch (this.firstAnimEndX) {
        default:
          this.firstAnimEndX = this.profileData[this.count].firstAnimEndX;
          break;
        case "center":
          this.firstAnimEndX = this.getXCenter();
          break;
        case "end":
          this.firstAnimEndX = this.getXEnd();
      }
    }


    this.firstAnimEndY = this.profileData[this.count].firstAnimEndY;
    if (this.firstAnimEndY != undefined) {
      switch (this.firstAnimEndY) {
        default:
          this.firstAnimEndY = this.profileData[this.count].firstAnimEndY;
          break;
        case "center":
          this.firstAnimEndY = this.getYCenter();
          break;
        case "end":
          this.firstAnimEndY = this.getYEnd();
      }
    }


    this.secondAnimEndX = this.profileData[this.count].secondAnimEndX;
    if (this.secondAnimEndX != undefined) {
      switch (this.secondAnimEndX) {
        default:
          this.secondAnimEndX= this.profileData[this.count].secondAnimEndX;
          break;
        case "center":
          this.secondAnimEndX = this.getXCenter();
          break;
        case "end":
          this.secondAnimEndX = this.getXEnd();
      }
    }



    this.secondAnimEndY = this.profileData[this.count].secondAnimEndY;
    if (this.secondAnimEndY != undefined) {
      switch (this.secondAnimEndY) {
        default:
          this.secondAnimEndY = this.profileData[this.count].secondAnimEndY;
          break;
        case "center":
          this.secondAnimEndY = this.getYCenter();
          break;
        case "end":
          this.secondAnimEndY = this.getYEnd();
      }
    }

  }

  /** ***************************** Reset Animations ***************************************************/

  resetSlideAnimations(this) {
    for (var currentItem = 0; currentItem < this.items.length; currentItem++) {
      this.textAnimation.to(this.items[currentItem], 0.1, { opacity: 0, x: 0, xPercent: this.xPercent });
    }
  }

  resetAnimations(this) {
    this.resetSlideAnimations(this);
  }

  /** ***************************** Reset Animations ***************************************************/

  handleWindowResize(this) {
    this.textAnimation.totalProgress(1).kill();
    this.resetAnimations();
    this.playAnimations(this);
  }

  // Get the point we want the first X to tween to (First Animation X End)
  getXCenter(this) {
    return window.innerWidth / 2;
  }

  // Get the point we want the first X to tween to (First Animation X End)
  getYCenter(this) {
    return 0;
  }


  // Second Animation X End
  getXEnd(this) {
    return window.innerWidth - 150;
  }
    // Second Animation X End
 getYEnd(this) {
      return window.innerHeight;
  }

}

