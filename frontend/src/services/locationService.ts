import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location} from '../models/models';
import { environment } from '../environments/environment';//for swaping backend target url


interface StatsResponse{
    locationId: number,
    totalItems: number,
    totalPrice: number,
    locationName: string, 
}

@Injectable({
    providedIn: 'root'
})
export class LocationService {
    private locationUrl = `${environment.apiUrl}/api/locations`;//instead of hardcoded url. for easy switching between local and deployement

    private http: HttpClient;  

    constructor(http: HttpClient) {
        this.http = http;       
    }
    
    getLocations():Observable<Location[]>{
        return this.http.get<Location[]>(this.locationUrl);
    }

    getStats():Observable<StatsResponse[]>{
        return this.http.get<StatsResponse[]>(`${this.locationUrl}/stats`);
    }
}

