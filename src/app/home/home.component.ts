import { Component, animate } from '@angular/core';
import { OnInit } from '@angular/core';
import { TweenLite, TimelineMax } from 'gsap';
import { HttpClient } from '@angular/common/http';
import { MathService } from '../math.service';

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
  canShowPositions: Boolean;
  tweenAnim: Object;

  constructor(public http: HttpClient, private mathService: MathService) { }

  ngOnInit(): void {
    console.log(this.mathService.cars);

    this.http.get('./assets/configs/home.json').subscribe(data => {
      this.profileData = data;
    });

    //Timeout is allowing for angular to create the divs from data in the json file
    var that = this;
    setTimeout(() => {
      this.init();
    }, 1000);
  }

  init() {
    this.canShowPositions = true;

    this.bindToElements();
    this.setUpAnimations();
    this.playAnimations();
  }

  /** ***************************** Bind and Setup ***************************************************/

  bindToElements(this) {
    this.createSlideBindings();
    this.topLeftDiv = document.getElementById('top-left');
    this.topRightDiv = document.getElementById('top-right');
    this.bottomLeftDiv = document.getElementById('bottom-left');
    this.bottomRightDiv = document.getElementById('bottom-right');
    this.showPositions();
  }

  createSlideBindings(this) {
    this.items = [];
    for (var configItem = 0; configItem < this.profileData.length; configItem++) {
      this.items[configItem] = document.getElementById(this.profileData[configItem].id);
    }
  }

  setUpAnimations() {
    this.textAnimation = new TimelineMax({ repeat: 0 });
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
      this.textAnimation.fromTo(this.items[itemCounter], 1, { opacity: 0, x: this.tweenAnimStart.x, y: this.mathService.getYStart(), xPercent: this.xPercent }, { opacity: 1, x: this.tweenAnim.x, y: this.tweenAnim.y, xPercent: this.xPercent });
      this.textAnimation.to(this.items[itemCounter], 1, { opacity: 0, x: this.secondtweenAnim.x, y: this.secondtweenAnim.y }, this.profileData[itemCounter].timeToFade);
    }
  }
  /** **************************** Reset Animations ***************************************************/
  validateAnimations(this) {
    this.tweenAnimStart = this.profileData[this.count].firstAnimStart;
    this.tweenAnim = this.profileData[this.count].firstAnimEnd;
    this.secondtweenAnim = this.profileData[this.count].secondAnimEnd;
   

    if (this.tweenAnimStart && this.tweenAnim && this.secondtweenAnim != undefined) {
      var tweenNames = [this.tweenAnimStart,this.tweenAnim, this.secondtweenAnim]
      for (var tweenItem = 0; tweenItem < tweenNames.length; tweenItem++)
        if (tweenNames[tweenItem] != undefined) {
          switch (tweenNames[tweenItem].x) {
            default:
              if (tweenNames[tweenItem].x  =="firstAnimEnd"){
              tweenNames[tweenItem].x = this.profileData[this.count].firstAnimEnd.x;
              } else if (tweenNames[tweenItem].x  =="secondAnimEnd"){
                tweenNames[tweenItem].x = this.profileData[this.count].secondAnimEnd.x;
              } else if(tweenNames[tweenItem].x  =="firstAnimStart"){
                tweenNames[tweenItem].x = this.profileData[this.count].firstAnimStart.x;
              }

              break;
              case "start":
              tweenNames[tweenItem].x = 0;
            case "center":
              tweenNames[tweenItem].x = this.mathService.getXCenter();
              break;
            case "end":
              tweenNames[tweenItem].x = this.mathService.getXEnd();
          }

          switch (tweenNames[tweenItem].y) {       
              default:
              if (tweenNames[tweenItem].y  =="firstAnimEnd"){
              tweenNames[tweenItem].y = this.profileData[this.count].firstAnimEnd.y;
              } else if (tweenNames[tweenItem].y  =="secondAnimEnd"){
                tweenNames[tweenItem].y = this.profileData[this.count].secondAnimEnd.y;
              } else if(tweenNames[tweenItem].y  =="firstAnimStart"){
                tweenNames[tweenItem].y = this.profileData[this.count].firstAnimStart.y;
              }

              break;
              case "start":
              tweenNames[tweenItem].y = 0;
            case "center":
              tweenNames[tweenItem].y = this.mathService.getYCenter();
              break;
            case "end":
              tweenNames[tweenItem].y = this.mathService.getYEnd();
          }
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
    this.showPositions();
    this.setUpAnimations();  // We just Killed Animations so we need to set them up again
    this.resetAnimations();
    this.playAnimations(this);
  }
  /** ***************************** Not sure how best to do this ***************************************************/
  showPositions(this) {
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

