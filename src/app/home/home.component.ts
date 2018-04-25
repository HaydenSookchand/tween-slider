import { Component, animate } from '@angular/core';
import { OnInit } from '@angular/core';
import { TweenLite, TimelineMax } from 'gsap';
import { HttpClient } from '@angular/common/http';
import { MathService } from '../math.service';
import { DataService } from '../data.service';
import { DimensionService } from '../dimension.service';

@Component({
  selector: 'app',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: []
})
export class HomeComponent {

  slideData: Object;
  slides: Array<Object>
  slideAnimation: Object;
  textAnimation: Object;
  textWrappers: Array<Object>
  xTo: Number;
  yTo: Number;
  xEnd: Number;
  tweenAnim: Object;

  constructor(public http: HttpClient, private mathService: MathService, private dataService: DataService, private dimensionService: DimensionService) {
    this.http.get('./assets/configs/demo.json').subscribe(data => {
      this.slideData = data;
    });
  }

  /** ***************************** Init ***************************************************/

  ngOnInit(): void {
    var that = this;
    setTimeout(() => {
      this.init();
    }, 1000);
  }

  init() {
    this.bindToElements();
    this.setUpAnimations();
    this.playAnimations();
  }

  /** ***************************** Bind and Setup ***************************************************/

  bindToElements(this) {
    this.createSlideBindings();
    this.dimensionService.init();
  }

  createSlideBindings(this) {
    this.slides = [];
    this.textWrappers = [];

    for (var configItem = 0; configItem < this.slideData.length; configItem++) {
      this.slides[configItem] = document.getElementById(this.slideData[configItem].id);
      this.textWrappers[configItem] = document.getElementById(this.slideData[configItem].textWrapperId);
    }
  }

  setUpAnimations() {
    this.slideAnimation = new TimelineMax({ repeat: 0 });
    this.textAnimation = new TimelineMax({ repeat: 0 });
  }

  /** ***************************** Play Animations ***************************************************/

  playAnimations(this) {
    this.playSlideAnimations();
  }

  /* 
  Plays Actual Slide Animations
  Plays Text Animations
  */

  playSlideAnimations(this) {
    for (var itemCounter = 0; itemCounter < this.slides.length; itemCounter++) {
      this.count = itemCounter;
      this.validateAnimations(this, this.slideData[this.count]);
      this.slideAnimation.fromTo(this.slides[itemCounter], 1, { opacity: 0, x: -50, y: this.slideAnimStart.y }, { opacity: 1, x: 0, y: this.slideAnimPause.y });
      this.textAnimation.fromTo(this.textWrappers[itemCounter], 10, { opacity: 0, x: 0, y: 0 }, { opacity: 1, x: 50, y: 0 }, +2);
      this.slideAnimation.to(this.slides[itemCounter], 1, { opacity: 0, x: this.slideAnimEnd.x, y: this.slideAnimEnd.y }, this.slideData[itemCounter].timeToFade);
    }
  }
  /** **************************** Reset Animations ***************************************************/

  //Look into refactoring this
  validateAnimations(this) {
    this.slideAnimStart = this.slideData[this.count].slideStart;
    this.slideAnimPause = this.slideData[this.count].slidePause;
    this.slideAnimEnd = this.slideData[this.count].slideEnd;

    if (this.slideAnimStart && this.slideAnimPause && this.slideAnimEnd != undefined) {
      var tweenNames = [this.slideAnimStart, this.slideAnimPause, this.slideAnimEnd]
      for (var tweenItem = 0; tweenItem < tweenNames.length; tweenItem++)
        if (tweenNames[tweenItem] != undefined) {
          switch (tweenNames[tweenItem].x) {
            default:
              if (tweenNames[tweenItem].x == "slidePause") {
                tweenNames[tweenItem].x = this.slideData[this.count].slidePause.x;
              } else if (tweenNames[tweenItem].x == "slideEnd") {
                tweenNames[tweenItem].x = this.slideData[this.count].slideEnd.x;
              } else if (tweenNames[tweenItem].x == "slideStart") {
                tweenNames[tweenItem].x = this.slideData[this.count].slideStart.x;
              }
              break;
            case "start":
              tweenNames[tweenItem].x = this.mathService.getXCenter();
            case "center":
              tweenNames[tweenItem].x = this.mathService.getXCenter();
              break;
            case "end":
              tweenNames[tweenItem].x = this.mathService.getXEnd();
          }
          switch (tweenNames[tweenItem].y) {
            default:
              if (tweenNames[tweenItem].y == "slidePause") {
                tweenNames[tweenItem].y = this.slideData[this.count].slidePause.y;
              } else if (tweenNames[tweenItem].y == "slideEnd") {
                tweenNames[tweenItem].y = this.slideData[this.count].slideEnd.y;
              } else if (tweenNames[tweenItem].y == "slideStart") {
                tweenNames[tweenItem].y = this.slideData[this.count].slideStart.y;
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
    for (var currentItem = 0; currentItem < this.slides.length; currentItem++) {
      this.slideAnimation.to(this.slides[currentItem], 0.1, { opacity: 0, x: 0 });
    }
  }

  resetAnimations(this) {
    this.resetSlideAnimations(this);
  }

  /** ***************************** Reset Animations ***************************************************/

  handleWindowResize(this) {
    this.slideAnimation.totalProgress(1).kill();
    var that = this;

    setTimeout(function () {
      //reset width and height of slide
      var slide = document.getElementsByClassName('slide');
      // slide[0].style.width = "100%";
      // slide[0].style.height = "100%";

      that.dimensionService.showOverlay();
      that.setUpAnimations();
      that.resetAnimations();
      that.playAnimations(that);
    }, 200);

  }
}
