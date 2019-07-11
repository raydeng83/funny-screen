import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  optionList = ["https://www.amazon.com", "https://www.netflix.com", "https://www.ted.com/#/", "https://www.youtube.com/"];
  newUrl;
  playInterval=3;
  myWindow;
  newInterval;
  loop;
  selectedOption;

  constructor() { }

  ngOnInit() {
  }

  addOption() {
    this.optionList.push(this.newUrl);
    this.newUrl = '';
  }

  removeOption() {
    if(this.selectedOption != null) {
    let i = this.optionList.indexOf(this.selectedOption);
    this.optionList.splice(i, 1);
    this.selectedOption = null;
    }
  }

  moveUpOption() {
    let i = this.optionList.indexOf(this.selectedOption);
    if (i>0) {
      let tmp = this.optionList[i-1];
      this.optionList[i-1]=this.selectedOption;
      this.optionList[i]=tmp;
    }
  }

  moveDownOption() {
    let i = this.optionList.indexOf(this.selectedOption);
    if (i<this.optionList.length-1) {
      let tmp = this.optionList[i+1];
      this.optionList[i+1]=this.selectedOption;
      this.optionList[i]=tmp;
    }
  }

  navigate() {
    let i=0;
    let urlList = this.optionList;
    if(this.myWindow!=null) {
      this.myWindow.close();
      clearInterval(this.loop);
    }

    this.myWindow = window.open(urlList[0], "_blank");

    let that = this;
    this.loop = setInterval(function(){ 
      i++;
      if(i >= urlList.length) {
        i=0;
      }
      that.myWindow.location.replace(urlList[i]) ;
    }, this.playInterval * 1000);
  }

  setPlayInterval() {
    this.playInterval = this.newInterval ;
  }

}
