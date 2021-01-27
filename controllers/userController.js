const User = require("../models/userModel");
const repo = require("../dbrepos/usersrepo");
const repoCourses = require("../dbrepos/coursesrepo");
const session = require("express-session");
let bcrypt = require("bcrypt");

exports.getAddUserForm = (req, res, next) => {
    res.render('add-user');
}

exports.getLoginUserForm = (req, res, next) => {
    console.log("Check if any active session.")
    if(req.session.userid){
        console.log("Trying to destroy session.")
        req.session.destroy(function(err) {
            if(err) {
              console.log(err);
            } else {
                res.render('login-user', {validationerror:""});
            }
        });
    }
    else{
        res.render('login-user', {validationerror:""});
    }
    
}

exports.addUser = async (req, res, next) => {
    let hashedPass = await bcrypt.hash(req.body.Password,10);
    const user = new User(req.body.Name,req.body.Email, hashedPass, req.body.Type)
    repo.add(user);
    repo.getAll((users) => {
        console.log("Users received after add");
        res.render('add-user');
    });
}

exports.loginUser = async (req, res, next) => {
        repo.login(req.body.Email,async (result) => {
            if(result != null){
                let isEqual = await bcrypt.compare(req.body.Password, result.password);
                console.log(isEqual);
                if(isEqual){
                    repoCourses.getAll((courses)=>{
                        res.render('list-courses',{courses: courses});
                    });
                }
                var ssn = req.session;
                ssn.userid = result._id;
                console.log("Session user " + ssn.userid);
                console.log("From DB pass: " + result.password);
            }
            else{
                res.render('login-user',{validationerror: "Login failed. Incorrect username or password."});
            }
        });
}

exports.getUpdateForm = (req, res, next) => {
    const id = req.session.userid;
    console.log(id);
    repo.get(id, (result) => {
        res.render('update-user', {user : result} );
    })   
}

exports.updateUser = async (req, res, next) => {
    let hashedPass = await bcrypt.hash(req.body.Password,10);
    const user = new User( req.body.Name,req.body.Email, hashedPass, req.body.Type, req.session.userid);
    repo.update(user, () => {
        console.log("call back after update.")
        res.render('login-user', {validationerror:""});
    });
}