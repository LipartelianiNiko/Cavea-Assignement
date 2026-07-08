import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../../services/itemService';
import { Item } from '../../../models/models';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { subscribeOn } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { LocationService } from '../../../services/locationService';
import { Location } from '../../../models/models';

@Component({
  selector: 'app-item-list',
  imports: [FormsModule],
  templateUrl: './item-list.html',
  styleUrl: './item-list.scss',
  standalone: true,
})

export class ItemList implements OnInit {
  sortBy: string = 'name';
  order: string = 'asc';
  page: number = 1;
  locationId: number | undefined = undefined;
  items: Item[] = [];
  totalItems:number=0;
  totalPages:number=0;
  pages:number[]=[];


  locations: Location[] = [];
  
  constructor(private itemService: ItemService,   private cd: ChangeDetectorRef, private router:Router, private locationService: LocationService) {
    console.log("CONSTRUCTOR");

  }

  ngOnInit(): void {//runs once only when component is created
    this.loadItems();
    this.locationService.getLocations()
      .subscribe((data) => {
        console.log(data);
        this.locations = data;
        console.log(this.locations)
        this.cd.detectChanges();
    });
  }

  loadItems(page?:number):void{
    if(page){
      this.page=page
    }
    console.log("get All times request sent");
    this.itemService.getItems(this.page, this.sortBy, this.order, this.locationId).subscribe((data) => {
      console.log("DATA RECEIVED", data);

      this.items = data.items;
      this.totalItems=data.totalItems
      this.totalPages=Math.ceil(this.totalItems / 20);
      this.pages = Array.from(
        { length: this.totalPages },
        (_, i) => i + 1
      );

      console.log("ITEMS NOW", this.items);

    this.cd.detectChanges();
    });
  }

  deleteItem(id: number): void {
    this.itemService.deleteItems(id).subscribe(() => {
            this.loadItems()
    }); 

  }

  toAddPage():void{
    this.router.navigate(['/add-item'])
  }
}