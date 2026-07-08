import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../models/models';

interface ItemRestponse{
    items:Item[]; 
    totalItems:number;
}


@Injectable({
    providedIn: 'root'
})
export class ItemService {
    private baseUrl = 'http://localhost:3000/api/inventories';

    private http: HttpClient;  

    constructor(http: HttpClient) {
        this.http = http;       
    }

    getItems(page:number=1,sortBy?:string, order?:string, locationId?:number):Observable<ItemRestponse>{
        
        let params = new HttpParams().set('page', page);

        if (sortBy) {
            params = params.set('sortBy', sortBy);
        }

        if (order) {
            params = params.set('order', order);
        }
        
        if(locationId){
            params = params.set('locationId', locationId);
        }

        return this.http.get<ItemRestponse>(this.baseUrl, { params });//this.http.get is functino that sends get request,
        // itme[] is return type of item interface set, this.baseurl is argument function takes, where to send the request
    }

    

    postItems(name:string, price:number, locationId:number): Observable<Item[]> {
        return this.http.post<Item[]>(this.baseUrl, {name, price, locationId});
    }

    deleteItems(id:number): Observable<any>{//doesnt return Item, returns json message only. so assign type any
        return this.http.delete(`${this.baseUrl}/${id}`);//smae, doenst have return type
    }

}