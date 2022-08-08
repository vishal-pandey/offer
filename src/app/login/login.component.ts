import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public ms: MainService) {
    if(this.ms.isLoggedIn()) {
      console.log(window.location.href)
      window.location.href = "";
    }
  }

  ngOnInit(): void {
  }

  email = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  loading:boolean = false;

  async login() {
    this.loading = true;
    await this.ms.login(this.email.value || '', this.password.value || '')
    this.loading = false;
  }

}
