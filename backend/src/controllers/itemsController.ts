import { Request, Response } from "express";
import { getAllItems, deleteItem, createItem } from "../services/itemServices";

//get all
export const getAllHandler=async(req:Request, res :Response)=>{
    try{
        const items=await getAllItems(); 
        res.status(200).json(items);//.json() sends the response. not res.status()
    }catch(error){
        res.status(500).json({message:"Failed to get items"})
    }
}

export const createItemHandler=async(req:Request, res :Response)=>{
    try{
    const name=req.body.name;
    const price=req.body.price;
    const locationId=req.body.locationId;
    
    if(!name || !price ||locationId){
        res.status(400).json({message: "Name, price and location are required"})
    }
    const item= await createItem(name, price, locationId);
    res.status(200).json(item);
    }catch (error: any) {//catch any erros
    if (error.name === 'SequelizeValidationError') {
      const messages = error.errors.map((e: any) => e.message);
      res.status(400).json({ message: messages.join(', ') });//join error messages strings
      return;
    }
    res.status(500).json({ message: 'Failed to create item.' });//if not squelizer error.
  }
}

export const removeItemHandler=async(req: Request,res: Response)=>{
    const id=Number(req.params.id);
    if(!id){
        res.status(400).json({message: "location Id required"});
    }
    const deleted= await deleteItem(id);
    if(!deleted){
        res.status(404).json({message:"Item not found"})
    }

    res.status(200).json({message:"item successfully deleted"})
}