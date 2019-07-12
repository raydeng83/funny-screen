import { Component, OnInit, HostListener } from '@angular/core';
import { ItemListService } from "../item-list.service";

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  optionList = ["https://www.amazon.com", "https://www.netflix.com", "https://www.ted.com/#/", "https://www.youtube.com/"];
  newUrl;
  playInterval = 3;
  myWindow;
  newInterval;
  loop;
  selectedOption;

  constructor(private itemListService: ItemListService) { }

  ngOnInit() {
  }

  addOption() {
    let regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    if (regexp.test(this.newUrl)) {
      this.optionList.push(this.newUrl);
      this.newUrl = null;
    }
    else {
      alert("Wrong URL format");
    }

  }

  removeOption() {
    if (this.selectedOption != null) {
      let i = this.optionList.indexOf(this.selectedOption);
      this.optionList.splice(i, 1);
      this.selectedOption = null;
    }
  }

  moveUpOption() {
    let i = this.optionList.indexOf(this.selectedOption);
    if (i > 0) {
      let tmp = this.optionList[i - 1];
      this.optionList[i - 1] = this.selectedOption;
      this.optionList[i] = tmp;
    }
  }

  moveDownOption() {
    let i = this.optionList.indexOf(this.selectedOption);
    if (i < this.optionList.length - 1) {
      let tmp = this.optionList[i + 1];
      this.optionList[i + 1] = this.selectedOption;
      this.optionList[i] = tmp;
    }
  }

  navigate() {
    let i = 0;
    let urlList = this.optionList;
    if (this.myWindow != null) {
      this.myWindow.close();
      clearInterval(this.loop);
    }

    this.myWindow = window.open(urlList[0], "_blank");

    let that = this;
    this.loop = setInterval(function () {
      i++;
      if (i >= urlList.length) {
        i = 0;
      }
      that.myWindow.location.replace(urlList[i]);
    }, this.playInterval * 1000);
  }

  setPlayInterval() {
    this.playInterval = this.newInterval;
  }

  getItemList() {
    let that = this;
    this.itemListService.getItemList().subscribe(
      res => {
        this.optionList = [];
        let itemList = Object.values(res);
        for (let i = 0; i < itemList.length; i++) {
          that.optionList.push(itemList[i].url);
        }
        alert("List fetched!");
      },
      error => {
        console.log(error);
      }
    );
  }

  setItemList() {
    this.itemListService.setItemList(this.optionList).subscribe(
      res => {
        alert("List saved!");
      },
      error => {
        console.log(error);
      }
    );
  }
}
