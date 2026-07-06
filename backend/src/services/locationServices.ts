import Location from "../models/location";

export const getAllLocations=async()=>{
    return await Location.findAll({ order: [['name', 'ASC']] });//order by name
}