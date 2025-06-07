const User = require("../models/user.js");
const valdiateEmail = require("../utils/validateEmail.js");

module.exports.renderSignupForm =(req,res)=>{
    res.render("users/signup.ejs");
};

module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login.ejs");
};

module.exports.signup =async(req,res)=>{
    try{
        let {username,email,password} = req.body;

        if (
            !emailData ||
            !emailData.is_valid_format.value ||
            !emailData.is_smtp_valid.value
          ) {
            req.flash("error", "Invalid email address.");
            return res.redirect("/signup");
          }
        const newUser = new User({email,username});
        const emailData = await valdiateEmail(email);
       
         const registeredUser = await User.register(newUser,password);
         req.login(registeredUser,(err)=>{
            if(err){
               return next(err);
            }
            req.flash("success","you have successfully registered!");
            res.redirect("/listings");
         });
    }
   catch(err){
    req.flash("error",err.message);
    res.redirect("/signup");
   }
};

module.exports.login = async(req,res)=>{
    req.flash("success","Welcome back to Wanderlust!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
    req.flash("success","Logged out");
    res.redirect("/login");
    });
 };