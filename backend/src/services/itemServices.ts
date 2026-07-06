import Item from "../models/item";
import Location from "../models/location";

export const getAllItems=async()=>{
    return await Item.findAll({
        include:{ model: Location, as:'location'}
    });
}

export const createItem=async(name:string, price:number, locationId:number)=>{
    await Item.create({name, price, locationId})
}

export const deleteItem=async(id:number)=>{
    const deleted=await Item.destroy({where :{id}})
    return deleted>0
}