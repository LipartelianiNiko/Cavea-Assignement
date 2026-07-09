import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location} from '../models/models';

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
    private locationUrl = 'http://localhost:3000/api/locations';

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

