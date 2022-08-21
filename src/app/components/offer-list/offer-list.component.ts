import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.scss']
})
export class OfferListComponent implements OnInit {

  offers: any = []

  loading: boolean = true;

  constructor(private ms: MainService, private router: Router) {
    this.fetchData();
  }

  ngOnInit(): void {
  }

  edit(offerId: string) {
    this.router.navigate(
      ['/offer/' + offerId]
    );
  }

  delete(offerId: string, name: string) {
    if (confirm('Are you sure you want to delete this offer of ' + name)) {
      this.loading = true
      this.ms.deleteOffers(offerId).subscribe((data: any) => {
        if (data.success) {
          this.fetchData()
          // alert("Offer Letter Deleted Successufully")
        } else {
          alert("Error deleting offer")
        }
      })
    }
  }

  fetchData() {
    this.ms.getOffers().subscribe((data: any) => {
      this.loading = false;
      if (data.success) {
        this.offers = [];
        data.result.forEach((offer: any) => {
          this.offers.push({
            "name": offer.name,
            "email": offer.email,
            "date": offer.date,
            "_id": offer._id
          })
        })
      }
    });
  }

}
