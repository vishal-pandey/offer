import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfferComponent } from './components/offer/offer.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
	{
		path: "",
		component: MainComponent
	},
	{
		path: "login",
		component: LoginComponent
	},
	{
		path: "offer",
		component: OfferComponent
	},
	{
		path: "offer/:id",
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
