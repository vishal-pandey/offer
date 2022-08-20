import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.scss']
})
export class OfferListComponent implements OnInit {

  constructor(private ms: MainService) {
    console.log(ms.getOffers());
  }

  ngOnInit(): void {
  }

  offers = [
    {
      "name": "Vishal Pandey",
      "email": "contact@email.com",
      "date": "8th August 2022"
    },
    {
      "name": "Radhey Shyam",
      "email": "contact@email.com",
      "date": "8th August 2022"
    },
    {
      "name": "Mohan Singh",
      "email": "contact@email.com",
      "date": "8th August 2022"
    },
    {
      "name": "Roshan Kumar",
      "email": "contact@email.com",
      "date": "8th August 2022"
    },
    {
      "name": "Yola solll",
      "email": "contact@email.com",
      "date": "8th August 2022"
    },
    {
      "name": "Lorem Ipsum",
      "email": "contact@email.com",
      "date": "8th August 2022"
    },
    {
      "name": "Ipsum Lorem",
      "email": "contact@email.com",
      "date": "8th August 2022"
    }
  ]

}
