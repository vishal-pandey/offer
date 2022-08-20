import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.scss']
})
export class OfferListComponent implements OnInit {

  offers:any = []

  constructor(private ms: MainService) {
    this.ms.getOffers().subscribe((data:any) => {
      if(data.success) {
        data.result.forEach((offer:any) =>{
          this.offers.push({
            "name": offer.name,
            "email": offer.email,
            "date": offer.date
          })
        })
      }
      console.log(data)
  });
  }

  ngOnInit(): void {
  }

}
