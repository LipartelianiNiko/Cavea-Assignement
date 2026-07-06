import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db';
import Location from './location'


interface IItem{
    id:number;
    name:string;
    price: number;
    locationId:number;
}

interface ItemCreation extends Optional<IItem, 'id'> {}//make id optional and autoincrement


export default class Item extends Model<IItem, ItemCreation>implements IItem{
  public id!: number;
  public name!: string;
  public price!: number;
  public locationId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Item.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: { msg: 'Item name cannot be empty.' } },
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notNull: { msg: 'Price is required.' },
        min: { args: [0], msg: 'Price cannot be negative.' },
      },
    },
    locationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Location, key: 'id' },
    },
  },
  {
    sequelize,
    tableName: 'items',
    timestamps: true,
  }
);

//one to many relationship. not for db, doesnt affect db, for future convinience. 
Location.hasMany(Item, { foreignKey: 'locationId', as: 'items' });
Item.belongsTo(Location, { foreignKey: 'locationId', as: 'location' });