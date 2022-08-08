import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor() { }

  saveData(data:any) {
    let url = 'https://offer-letter-generator.herokuapp.com/'

    fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
  }

  login(email:string, password:string) {
    if(email == '' || password == ''){
      alert('Please enter Email and Password')
      return
    }

    if(email == 'test@gmail.com' && Md5.hashAsciiStr(password) == 'b24331b1a138cde62aa1f679164fc62f') {
      sessionStorage.setItem('pwd', Md5.hashAsciiStr(password));
      window.location.href = '/';
    } else {
      alert("Wrong Email Or Password")
    }
  }

  logout() {
    sessionStorage.removeItem('pwd')
    window.location.href = './'
  }

  isLoggedIn() {
    let pwd:string = sessionStorage.getItem('pwd') || 'no-password-found'
    if (pwd == 'b24331b1a138cde62aa1f679164fc62f') {
      return true;
    } else {
      return false
    }
  }

}
