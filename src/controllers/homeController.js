import { render } from 'ejs';
import db from '../models/index'
import CRUDService from '../services/CRUDService';
let getHomePage = async(req, res) =>{
    try{
        let data = await db.User.findAll();
        console.log(data);
        return res.render('homepage.ejs', {
            data: JSON.stringify(data),
        });

    } catch(e){
        console.log(e);
    }

}
let getCRUD =  async(req, res) =>{
    return res.render("crud.ejs")
}
let postCRUD = async(req, res) =>{
    let message = await CRUDService.createNewUser(req.body);
    console.log(message);
    return res.send('post crud form server')
}

let displayCRUD = async(req, res) =>{
    let data = await CRUDService.getAllUsers();
    return res.render('displaycrud.ejs',{
        dataTable: data
    })
}

let getEditCRUD = async(req, res) =>{
    let userId = req.query.id;
    if(userId){
        let userData = await CRUDService.getUserInfoById(userId);
        //check uer data not found
        return res.render('editcrud.ejs',{
            user : userData
        });

    }
    else{
        return res.send('no user');
    }

}
let updateCRUD = async(req, res) =>{
    let data = req.body;
    let allUsers = await CRUDService.updateUserData(data);
    return res.render('displaycrud.ejs',{
        dataTable: allUsers
    })
}
let deleteCRUD = async(req, res) =>{
    let userId = req.query.id;
    if(userId){
        await CRUDService.deleteUserData(userId);
        return res.send('Delete user successfully');
    }
    else{
        return res.send('Not found user')
    }
}

module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayCRUD: displayCRUD,
    getEditCRUD: getEditCRUD,
    updateCRUD : updateCRUD ,
    deleteCRUD : deleteCRUD

}