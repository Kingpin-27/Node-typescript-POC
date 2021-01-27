import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/db';

class Employees extends Model { }

Employees.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    lastName: DataTypes.STRING,
    salary:{
        type: DataTypes.FLOAT,
        defaultValue: 0
    },
    age: {
        type: DataTypes.INTEGER,
        defaultValue: 25
    }
}, {
    sequelize,
    timestamps: true,
    modelName: 'Employees'
});

Employees.sync();

export default Employees;
