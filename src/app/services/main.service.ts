import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient) { }

  saveData(data:any) {
    let url = 'https://offer-letter-generator.herokuapp.com/offer/'
    let token:any = this.getToken();

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer '+ token
      })
    };

    return this.http.post(url, JSON.stringify(data), httpOptions);
  }

  getOffers(offerId:any = "") {
    let url = 'https://offer-letter-generator.herokuapp.com/offer/'+offerId
    let token:any = this.getToken();


    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer '+ token
      })
    };

    return this.http.get(url, httpOptions);
  }

  deleteOffers(offerId:any = "") {
    let url = 'https://offer-letter-generator.herokuapp.com/offer/'+offerId
    let token:any = this.getToken();


    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer '+ token
      })
    };

    let d;

    return this.http.delete(url, httpOptions);
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
    let token:any = sessionStorage.getItem('pwd');
    if (token) {
      return true;
    } else {
      return false
    }
  }
  
  getToken() {
    let token:any = sessionStorage.getItem('pwd');
    return token;
  }

}
