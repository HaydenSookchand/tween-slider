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

  constructor(public http: HttpClient) { }

  ngOnInit(): void {
    // get data - maybe use a service?
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
    this.playAnimations();
  }

  /** ***************************** Bind and Setup ***************************************************/

  bindToElements(this) {
    this.createSlideBindings();
  }

  createSlideBindings(this) {
    // This reads tha amount of items in the json file to determine how many items to map 2 instead of manually having to enter code 
    //this.items1 = document.getElementById("slide-1");
    //this.items2 = document.getElementById("slide-2");
    this.items = [];
    for (var b = 0; b < this.profileData.length; b++) {
      this.items[b] = document.getElementById(this.profileData[b].id);
    }
  }

  setUpAnimations() {
    this.textAnimation = new TimelineMax({ repeat: 0 });
  }

  /** ***************************** Play Animations ***************************************************/

  playAnimations(this) {
    this.x = this.getMiddleX();
    this.playSlideAnimations();
  }

  playSlideAnimations(this) {
    for (var a = 0; a < this.items.length; a++) {
      this.textAnimation.fromTo(this.items[a], 1, { opacity: 0, x: 0, xPercent: -50 }, { opacity: 1, x: this.x, xPercent: -50 });
      this.textAnimation.to(this.items[a], 1, { opacity: 0, x: window.innerWidth - 150 }, "+=3");
    }
  }

  /** ***************************** Reset Animations ***************************************************/

  resetSlideAnimations(this) {
    for (var a = 0; a < this.items.length; a++) {
      this.textAnimation.to(this.items[a], 0.1, { opacity: 0, x: 0, xPercent: -50 });
    }
  }

  resetAnimations(this) {
    this.resetSlideAnimations(this);
  }

  /** ***************************** Reset Animations ***************************************************/

  // Handle Click on replay
  handleReplay(this) {
    this.playAnimations(this);
  }

  // Handle Window Resize
  handleResize(this) {
    this.textAnimation.totalProgress(1).kill();
    this.resetAnimations();
    this.playAnimations(this);
  }

  // Get the correct X value - like to move this out into a co-ordinate class
  getMiddleX(this) {
    return window.innerWidth / 2;
  }
}

