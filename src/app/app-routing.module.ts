import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaceDetailsComponent } from './place-details/place-details.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    
    path: '', 
    component: AppComponent,
    
  },
  {
    path: 'place-details/:placeId', 
    component: PlaceDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
