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
    console.log(data);
    return res.render('displaycrud.ejs',{
        dataTable: data
    })
}

module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayCRUD: displayCRUD

}