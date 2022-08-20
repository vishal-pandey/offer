import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.scss']
})
export class OfferListComponent implements OnInit {

  offers:any = []

  loading: boolean = true;

  constructor(private ms: MainService, private router: Router) {
    this.ms.getOffers().subscribe((data:any) => {
      this.loading = false;
      if(data.success) {
        data.result.forEach((offer:any) =>{
          this.offers.push({
            "name": offer.name,
            "email": offer.email,
            "date": offer.date,
            "_id": offer._id
          })
        })
      }
      console.log(data)
  });
  }

  ngOnInit(): void {
  }

  edit(offerId:string) {
    this.router.navigate(
      ['/offer/'+offerId]
    );
  }

}
