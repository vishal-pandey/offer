import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public ms: MainService) { }

  ngOnInit(): void { }

  logoClick() {
    console.log("clicked")
    window.location.href = "https://www.hirel.in"
  }

}
