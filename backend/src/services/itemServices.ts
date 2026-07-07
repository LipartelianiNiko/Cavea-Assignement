import Item from "../models/item";
import Location from "../models/location";

export const getAllItems=async(
    sortby?: "name" | "price" | "location"|undefined , 
    order?:"asc"| "desc" |undefined, 
    id?:number |undefined
    )=>{
    let items=[];

    if(id){
        items=await Item.findAll({
            where:{
                locationId:id
            },
            include:{ model: Location, as:'location'}
        })
    }else{
        items=await Item.findAll({
            order:[["name", "ASC"]],//default by name
            include:{ model: Location, as:'location'}
        });

    }

    if(sortby==="name"){
        items.sort((a,b)=>a.name.localeCompare(b.name));
    }

    if(sortby==="price"){
        items.sort((a,b)=>Number(a.price)-Number(b.price));
    }

    if(sortby==="location"){
        items.sort((a,b)=>a.locationId-b.locationId);
    }

    if(order === "desc"){
        items.reverse();
    }

    return items;
}

export const createItem=async(name:string, price:number, locationId:number)=>{
    return await Item.create({name, price, locationId})
}

export const deleteItem=async(id:number)=>{
    const deleted=await Item.destroy({where :{id}})
    return deleted>0
}