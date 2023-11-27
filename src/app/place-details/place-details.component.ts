import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OpeningHours, Place, PlacesService, WorkingBlock } from '../services/places.service';

@Component({
  selector: 'app-place-details',
  templateUrl: './place-details.component.html',
  styleUrls: ['./place-details.component.css']
})
export class PlaceDetailsComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private placesService: PlacesService,
  ) { }

  place: Place = {
    name: "",
    address: "",
    isOpen: false, 
    nextChange: "",
    openingHours: []
  }

  placeId: string = "";

  jsonToMap(json: any): Map<string, WorkingBlock[]> {
    const result = new Map<string, WorkingBlock[]>();

    // Iterate through the key-value pairs of the JSON object
    for (const key in json) {
      if (json.hasOwnProperty(key)) {
        result.set(key, json[key]);
      }
    }

    return result;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.placeId = params['placeId'];

      if (this.placeId != "") {
        this.placesService.getPlaceDetails(this.placeId).subscribe({
          next: data => {
            this.place.name =  data.name
            this.place.address = data.address
            this.place.isOpen = data.isOpen
            this.place.nextChange =  data.nextChange
            this.place.openingHours = new Array(data.openingHours.size)

            for (let i = 0; i< data.openingHours.length ; i++) {
              let entry: OpeningHours= {
                days: this.daysToStr(data.openingHours[i].Days),
                workingBlocks: data.openingHours[i].WorkingBlocks,
              }
              this.place.openingHours[i] = entry
            }
        },
          error: err => {
            console.log("getPlaceDetails called and failed")
          }
        })
      }

    });
  }


  daysToStr(days: string[]) {
    let out = ""

    if (days != null && days.length != 0) {
      out = days[0]
  
      if (days.length == 2) {
        out += ", " + days[1]
      }
      if (days.length > 2) {
        out += " - " + days[days.length - 1]
      }
    }
  
    return out 
  }

  dataAvailable() {
    if (this.place.name == "") {
      return false 
    }

    return true 
  }
  
}