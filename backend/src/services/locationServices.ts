import { Sequelize } from "sequelize";
import Location from "../models/location";
import Item from "../models/item";

export const getAllLocations=async()=>{
    return await Location.findAll({ order: [['name', 'ASC']] });//order by name
}

export const getStats=async()=>{
    return await Item.findAll({
        attributes: [
        "locationId",
        [Sequelize.fn("COUNT", Sequelize.col("Item.id")), "totalItems"],
        [Sequelize.fn("SUM", Sequelize.col("price")), "totalPrice"]
        ],
        include: [
        {
            model: Location,
            as: "location",
            attributes: ["name"]
        }
        ],
        group: ["locationId", "location.id"],
        raw: true

    });
};
