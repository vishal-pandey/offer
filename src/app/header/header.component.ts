import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn:boolean = false;

  constructor() {
    let pwd:string = sessionStorage.getItem('pwd') || 'no-password-found'
    if (pwd == 'b24331b1a138cde62aa1f679164fc62f') {
      this.isLoggedIn = true;
    }
  }

  ngOnInit(): void {
  }

  logout() {
    sessionStorage.removeItem('pwd')
    window.location.href = './'
  }

}
