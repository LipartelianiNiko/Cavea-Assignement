export interface Location{
    id:number;
    name:string;
}

export interface Item{
    id:number;
    name:string;
    locationId:number;
    price:number; 
    location?:Location;
}