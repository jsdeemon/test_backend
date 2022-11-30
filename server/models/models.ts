import sequelize from '../db'
// const IUser = require('../types/IUser');
const {DataTypes} = require('sequelize')



const User: any = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})



export default User 