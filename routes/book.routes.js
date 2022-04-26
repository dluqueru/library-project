const Book = require("../models/Book.model")

const router = require("express").Router();


router.get("/books", (req, res, next) => {
  Book.find()
    .then((booksArr) => {

        console.log(booksArr);

        res.render("books/books-list.hbs", {books: booksArr})
    })
    .catch(err => {
        console.log("error getting books from DB", err)
        next(err);
    })
});

router.get("/books/create", (req, res, next) => {
    res.render("books/books-create");
})

router.post("/books/create", (req, res, next) => {
    const newBook = {
        title: req.body.title,
        description: req.body.description,
        author: req.body.author,
        rating: req.body.rating
    }

    Book.create(newBook)
        .then((bookFromDB) => {
            res.redirect("/books")
        })
        .catch(err => {
            console.log("error creating book on DB", err)
            next(err);
        })
})

router.get("/books/:bookId", (req, res, next) => {
    const id = req.params.bookId;

    Book.findById(id)
    .then((bookDetails) => {
        res.render("books/book-details", {book: bookDetails})
    })
    .catch(err => {
        console.log("error getting books from DB", err)
        next(err);
    })
})

router.get("/books/:bookId/edit", (req, res, next) => {
    const id = req.params.bookId;

    Book.findById(id)
    .then((bookDetails) => {
        res.render("books/book-edit", {bookDetails})
    })
    .catch(err => {
        console.log("error getting details of a book from DB", err)
        next(err);
    })
})

router.post("/books/:bookId/edit", (req, res, next) => {
    const id = req.params.bookId;
    
    const newDetails = {
        title : req.body.title,
        description : req.body.description,
        author : req.body.author,
        rating : req.body.rating
    }

    Book.findByIdAndUpdate(id, newDetails)
    .then((bookFromDB) => {
        res.redirect(`books/${bookFromDB._id}`)
    })
    .catch(err => {
        console.log("error updating book from DB", err)
        next(err);
    })
})

router.post("/books/:bookId/delete", (req, res, next) => {
    const id = req.params.bookId;

    Book.findByIdAndRemove(id)
        .then(response => {
            res.redirect("/books")
        })
        .catch(err => {
            console.log("error deleting book from DB", err)
            next(err);
        })
})



module.exports = router;