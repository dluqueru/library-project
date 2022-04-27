const router = require("express").Router();
const bcryptjs = require("bcryptjs");
const User = require("../models/User.model");

const saltRounds = 10;

router.get("/register", (req, res, next) => {
    res.render("auth/register")
})

router.post("/register", (req, res, next) => {
    const {email, password} = req.body; // ES6 object destructuring // es lo mismo que const email = req.body.email & const password = req.body.password

    if (!email || !password) {
        res.render('auth/register', {errorMessage: "Please provide email and password"});
        return;
    }

    bcryptjs
    .genSalt(saltRounds)
    .then(salt => {
        return bcryptjs.hash(password, salt)
    })
    .then(hash => {
      const userDetails = {
            email: email,
            passwordHash: hash
        }
        return User.create(userDetails)
    })
    .then(userFromDB => {
        res.send("user was created!! :D")
    })
    .catch(error => next(error));
})

router.get("/login", (req, res, next) => {
  res.render("auth/login")
})

router.post("/login", (req, res, next) => {
    const {email, password} = req.body;

    if (!email || !password) {
        res.render('auth/login', {errorMessage: "Please provide email and password"});
        return;
    }

    User.findOne({email: email})
        .then(userFromDB => {
            if (!userFromDB){
                res.render("auth/login", {errorMessage: "email is not registered. Try other email."})
                return;
            } else if (bcryptjs.compareSync(password, userFromDB.passwordHash)){
                res.render("auth/user-profile", {user: userFromDB})
                
            } else {
                res.render("auth/login", {errorMessage: "incorrect credentials"})
            }
        })
        .catch(error => next(error));
})

router.get("/user-profile", (req, res, next) => {
    res.render("auth/user-profile")
  })
  

module.exports = router;