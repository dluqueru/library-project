const Author = require("../models/Author.model");

const router = require("express").Router();

router.get("/authors", (req, res, next) => {
    Author.find()
    .then((authorsArr) => {

        console.log(authorsArr);

        res.render("/authors/authors-list", {authors: authorsArr})
    })
    .catch(err => {
        console.log("error getting authors from DB", err)
        next(err);
    })
});

module.exports = router;