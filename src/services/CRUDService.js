
import { where } from 'sequelize';
import db from '../models/index'
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName:data.firstname ,
                lastName: data.lastname,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
            })

            resolve("ok create a new user successfully");

        } catch (error) {
            reject(error);
        }
    })

}

let hashUserPassword = (password) => {
    return new Promise((resolve, reject) => {
        try {
            let hash = bcrypt.hashSync("B4c0/\/", salt);
            resolve(hash)

        } catch (error) {
            reject(error);
        }

    }
    )
}

let getAllUsers = () =>{
    return new Promise(async(resolve, reject) => {
        try {
            let users = await db.User.findAll({
                raw: true,
            });
            resolve(users);
        } catch (error) {
            reject(error);
        }
    })

}

let getUserInfoById = (userId) => {
    return new Promise(async(resolve, reject) =>{
        try {
            let user = await db.User.findOne({
                where: {id: userId},
                raw: true
            })
            if (user) {
                resolve(user);
            }
            else {
                resolve("Find by not User")
            }
        } catch (error) {
            reject(error);
        }
    })
}
let updateUserData = (data) => {
    return new Promise(async(resolve, reject) =>{
        try {
            let user = await db.User.findOne({
                where: {id: data.id}
            })
            if (user){
                user.firstName = data.firstname;
                user.lastName  = data.lastname;
                user.address = data.address;

                await user.save();
                let allUsers = await db.User.findAll();
                resolve(allUsers);
            }
            else{
                resolve([])
            }
        } catch (error) {
            reject(error);
        }
    })
}
let deleteUserData = (userId) => {
    return new Promise(async(resolve,reject) =>{
        try {
            let user = await db.User.findOne({
                where: {id : userId}
            });
            if (user){
                await user.destroy();
            }

            resolve();
            
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    createNewUser: createNewUser,
    getAllUsers: getAllUsers,
    getUserInfoById : getUserInfoById,
    updateUserData: updateUserData,
    deleteUserData : deleteUserData 
}