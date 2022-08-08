import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private ms: MainService) {
    if(!this.ms.isLoggedIn()) {
      window.location.href = "/login"
    }
  }

  ngOnInit(): void {
  }

}
