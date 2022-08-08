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

  async login(email:string, password:string) {
    if(email == '' || password == ''){
      alert('Please enter Email and Password')
      return
    }

    let url = 'https://offer-letter-generator.herokuapp.com/login/';

    await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({email, password}) // body data type must match "Content-Type" header
    })
    .then(data => data.json())
    .then((data)=>{
      if(data.success){
        sessionStorage.setItem('pwd', data.token);
        window.location.href = '/';
        return
      }else{
        alert(data.message)
        return
      }
    });
  }

  logout() {
    sessionStorage.removeItem('pwd')
    window.location.href = './'
  }

  isLoggedIn() {
    let pwd:any = sessionStorage.getItem('pwd');
    if (pwd) {
      return true;
    } else {
      return false
    }
  }

}
