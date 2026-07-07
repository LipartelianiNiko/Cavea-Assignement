import { Order } from "sequelize";
import Item from "../models/item";
import Location from "../models/location";


export const getAllItems=async(
    page:number=1, 
    sortBy?: "name" | "price" | "location" , 
    order?:"asc"| "desc" , 
    id?:number ,
    )=>{

    let query:Order=[["name", "ASC"]];
    
    if(sortBy==="name"){
        query=[["name", order==="desc"? "DESC":"ASC"]]//if else, if order equals=desc, return DESC else ASC
    }

    if(sortBy==="price"){
        query=[["price", order==="desc"? "DESC":"ASC"]]//if else, if order equals=desc, return DESC else ASC
    }
    
    if(sortBy==="location"){
        query=[["locationId", order==="desc"? "DESC":"ASC"]]//if else, if order equals=desc, return DESC else ASC
    }
    
    const myOffset=(page-1)*20;
    return await Item.findAll({
        where : id ? {locationId:id} : {},//if id isnt null use value location:id, if not use emtpy value for where
        order: query, 
        limit:20, 
        offset:myOffset,
        include:{
            model: Location,
            as:"location"
        }
    });

}

export const createItem=async(name:string, price:number, locationId:number)=>{
    return await Item.create({name, price, locationId})
}

export const deleteItem=async(id:number)=>{
    const deleted=await Item.destroy({where :{id}})
    return deleted>0
}