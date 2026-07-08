import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { subscribeOn } from 'rxjs';
import { LocationService } from '../../../services/locationService';
import { Location } from '../../../models/models';


@Component({
  selector: 'app-stats',
  imports: [],
  templateUrl: './stats.html',
  styleUrl: './stats.scss',
})

export class Stats {
  result:any=[];
  constructor(private cd: ChangeDetectorRef, private router:Router, private locationService: LocationService) {

      console.log("STATS CONSTRUCTOR");

  }
  
  ngOnInit(): void {
    this.locationService.getStats()
        .subscribe((data) => {
          console.log(data);
          this.result=data;
          console.log(this.result)
          this.cd.detectChanges();
      });
  }

  goBack():void{
    this.router.navigate(['/items'])
  }
  
}
