import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfferComponent } from './offer/offer.component';
import { NotfoundComponent } from './notfound/notfound.component';

const routes: Routes = [
	{
		path: "",
		component: OfferComponent
	},
	{
		path: '**',
		component: NotfoundComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
