import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db';


interface ILocation{
    id:number;
    name:string;
}

export default class Location extends Model<ILocation>implements ILocation{
  public id!: number;
  public name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Location.init(
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: false,
        },
        name:{ 
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        sequelize,
        tableName: 'locations',
        timestamps: true,
    });



