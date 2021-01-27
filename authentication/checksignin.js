exports.checkSignIn = (req, res, next) => {
    if(req.session.userid){
            next(); //If session exists, proceed to page
    } else {
       var err = new Error("Not logged in!");
       console.log(req.session.user);
       res.render('login-user', {validationerror:""});
    }
 }