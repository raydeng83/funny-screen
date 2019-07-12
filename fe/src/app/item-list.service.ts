import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AppConst} from './app-const';
import { Observable } from 'rxjs';
import { Item } from './item';

@Injectable({
  providedIn: 'root'
})
export class ItemListService {

  constructor(private http: HttpClient) { }

  getItemList() {
    let url = AppConst.serverPath+"/pageItem/list";

    let header = new Headers ({
      'Content-Type': 'application/json',
    });
    return this.http.get(url);
  }

  setItemList(itemList) {
    let url = AppConst.serverPath+"/pageItem/list";

  	let info = itemList;

    let header = new Headers ({
      'Content-Type': 'application/json',
    });
    return this.http.post(url, info);
  }
}
