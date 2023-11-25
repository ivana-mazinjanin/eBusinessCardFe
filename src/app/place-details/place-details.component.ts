import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Place, PlacesService, WorkingBlock } from '../services/places.service';

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
    openingHours: {
      days: {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
      }
    }
    
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
        console.log(this.placeId)
        this.placesService.getPlaceDetails(this.placeId).subscribe({
          next: data => {
            console.log(data)
            // console.log(data.opening_hours.days["monday"])

        
            console.log("***")
           
            // this.place.name = data.displayed_what
            // this.place.address = data.displayed_where
            // this.place.openingHours.days = this.jsonToMap(this.place.openingHours.days)

            // let tmp = this.jsonToMap(this.place.openingHours.days)
            // console.log(typeof(this.place.openingHours.days))
            // console.log(tmp.get("monday"))

            this.place = {
              name: data.displayed_what,
              address: data.displayed_where,
              openingHours: {
                days: {
                  monday: data.opening_hours.days.monday,
                  tuesday: data.opening_hours.days.tuesday,
                  wednesday: data.opening_hours.days.wednesday,
                  thursday: data.opening_hours.days.thursday,
                  friday: data.opening_hours.days.friday,
                }
              }
          
          }
        },
          error: err => {
            console.log("getPlaceDetails called and failed")
          }
        })
      }


    });
  }

}
