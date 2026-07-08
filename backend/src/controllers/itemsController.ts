import { Request, Response } from "express";
import { getAllItems, deleteItem, createItem } from "../services/itemServices";

//get all
export const getAllHandler=async(req:Request, res :Response)=>{
    try{
        console.log("GET /inventories", req.query);
        const sortBy= req.query.sortBy as "name" | "price" | "location" | undefined;//either those values or undefined
        const order=req.query.order as "asc" |"desc" | undefined;
        const locationId = req.query.locationId 
        ? Number(req.query.locationId) 
        : undefined;

        const page = Number(req.query.page) || 1;

        const result=await getAllItems(page, sortBy, order, locationId);//returns count  too, not just item list 

        res.status(200).json({
            items: result.rows,//send items set separately 
            totalItems: result.count//send count separately
        });

    }catch(error){
        console.error('getItemsHandler error:', error);
        res.status(500).json({message:"Failed to get items"})
    }
}

export const createItemHandler=async(req:Request, res :Response)=>{
    try{
    const name=req.body.name;
    const price=req.body.price;
    const locationId=req.body.locationId;
    
    if(!name || !price ||!locationId){
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
    console.log("DELETE /inventories", req.query);

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