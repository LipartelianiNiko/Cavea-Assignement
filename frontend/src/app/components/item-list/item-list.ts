import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../../services/itemService';
import { Item } from '../../../models/models';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-item-list',
  imports: [],
  templateUrl: './item-list.html',
  styleUrl: './item-list.scss',
  standalone: true,
})

export class ItemList implements OnInit {

  items: Item[] = [];

  constructor(private itemService: ItemService,   private cd: ChangeDetectorRef) {
    console.log("CONSTRUCTOR");

  }

  ngOnInit(): void {
    console.log("get All times request sent");
    this.itemService.getItems().subscribe((data) => {
      console.log("DATA RECEIVED", data);

      this.items = data;

      console.log("ITEMS NOW", this.items);

    this.cd.detectChanges();
    });
  }
}