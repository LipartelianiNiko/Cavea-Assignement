import { Request, Response } from "express";
import { getAllLocations } from "../services/locationServices";
import { getStats } from "../services/locationServices";

//get all
export const getAllLocationsHandler=async(req:Request, res :Response)=>{
    try{
        const items=await getAllLocations(); 
        res.status(200).json(items);//.json() sends the response. not res.status()
    }catch(error){
        res.status(500).json({message:"Failed to get items"})
    }
}

export const getStatsHandler=async(req:Request, res :Response)=>{
    try{
        console.log("Get /locations/stats", req.query);
        const result=await getStats(); 
        res.status(200).json(result);//.json() sends the response. not res.status()
    }catch(error){
        res.status(500).json({message:"Failed to get items"})
    }
}

