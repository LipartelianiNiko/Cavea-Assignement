import { Component } from '@angular/core';
import{ItemService} from "../../../services/itemService"
import { Router } from '@angular/router';
import {LocationService} from "../../../services/locationService"
import { Location } from '../../../models/models';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.html',
  styleUrl: './add-item.scss',
  imports: [FormsModule],
})


export class AddItem {
  name:string=''; 
  price:number=0;
  locationId:number=0;


  locations: Location[] = [];

  constructor(
    private itemService:ItemService, 
    private router: Router,
    private locationService:LocationService, 
    private cd: ChangeDetectorRef
  ){}


  ngOnInit(): void {//on creation fetch locations from backend to use them in select element as options
    this.locationService.getLocations()
      .subscribe((data) => {
        console.log(data);
        this.locations = data;
        console.log(this.locations)
        this.cd.detectChanges();
    });
  }

  createItem():void{
    if (!this.name || this.price <= 0 || this.locationId === 0) {
      alert("All fields are required");
      return;
    }
    this.itemService.postItems(this.name, this.price, this.locationId)
      .subscribe({
          next:()=>{   //if successful     
            this.router.navigate(['/items']);//redirect to /itmes route which then reloads item-list component
          },
          error: (err)=>{//if error stay on same page and alert
            console.error("Failed to create item", err);
            alert("Failed to create item. Please try again.");
          }
      });
  }

  goBack():void{
    this.router.navigate(['/items'])
  }
}
