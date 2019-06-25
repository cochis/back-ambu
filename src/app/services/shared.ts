import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  getLocal(key: any) {
    // const item = localStorage.getItem(key);
    const item = JSON.parse(sessionStorage.getItem(key));
    return item;
  }

  setLocal(key: any, value: any) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
  getSession(key: any) {
    const item = JSON.parse(sessionStorage.getItem(key));
    return item;
  }

  setSession(key: any, value: any) {
    console.log('set ' + key);
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  ramdom() {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 2; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
