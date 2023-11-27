import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

const E_BUSINESS_CARD_API = 'http://localhost:8080';

export interface Place {
  name: string;
  address: string;
  isOpen: boolean;
  openingHours: OpeningHours[];
}

export interface OpeningHours {
  days:          string,
	workingBlocks: WorkingBlock[]
}

export interface WorkingBlock {
  start: string;
  end: string;
  type: string;
}


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  constructor(
    private http: HttpClient
  ) { }

  getPlaceDetails(placeId: string): Observable<any> {

    console.log("call getPlaceDetails service");

    let url = E_BUSINESS_CARD_API + "/place-details/" + placeId;

    return  this.http.get<Place>(url, httpOptions)

  }

}
