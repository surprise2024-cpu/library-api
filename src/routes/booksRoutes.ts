import { Router } from "express";
import { authors, books } from "../data/store.js";
import { validateBook } from "../middleware/validateBook.js";
import { validateBookUpdate } from "../middleware/validateBookUpdate.js";


const router = Router();

// creating the post route
router.post('/', validateBook, (req, res) => {

    // gets the name from the JSON body
    const { title, year, authorId } = req.body;

    // checking if an author exists
    // authors.some() checks whther at least one item in an array matches a condition
    // enforces the relationship between books and authors  
    const authorExists = authors.some(
        (author) => author.id === authorId
    );

    if (!authorExists) {
        return res.status(400).json({
            success: false,
            error: 'Invalid authorId'
        });
    }

    // checks whether a book with the same title exists
    const duplicateBook = books.find((book) => 
        book.title.toLowerCase() === title.toLowerCase() &&
        book.authorId === authorId
    );   

    // if a duplicate book exists, throw this error
    if (duplicateBook) {
        return res.status(409).json({
            success: false,
            error: 'Book already exists.'
        })
    }

    const newBook = {
        id: books.length + 1,
        title,
        year,
        authorId
    };


    // adds the new author to the end of the authors array
    books.push(newBook);

    // sends a status 201 response which basicaly means the object was successfully created
    res.status(201).json({
        success: true,
        data: newBook
    });

});

router.get('/', (req, res) => {

    res.status(200).json({
        success: true,
        data: books
    });
});

// router for getting an author by their id
router.get('/:id', (req, res) => {

    const id = Number(req.params.id);

    const book = books.find((book) => book.id === id );

    if (!book) {

        return res.status(404).json({
            success: false,
            error: 'Book not found'
        });
    }

    res.status(200).json({
        success: true,
        data: book
    });

});

router.put('/:id', validateBookUpdate, (req, res) => {

    const id = Number(req.params.id);

    const book = books.find((book) => book.id === id);

    if (!book) {
        return res.status(404).json({
            success: false,
            error: 'Book not found'
        });
    }

    const { title, year, authorId } = req.body;

    if (authorId !== undefined) {

        const authorExists = authors.some(

            (author) => author.id === authorId
        );

        if (!authorExists) {
            return res.status(400).json({
                success: false,
                error: 'Invalid authorId'
            });
        }
    }

    if (title !== undefined) {
        book.title = title;
    }

    if (year !== undefined) {
        book.year = year;
    }

    if (authorId !== undefined) {
        book.authorId = authorId;
    }

    res.status(200).json({
        success: true,
        data: book
    });

});

// route for deleting a bok using its id
router.delete('/:id', (req, res) => {

    const id = Number(req.params.id);

    const bookIndex = books.findIndex((book) => book.id === id);

    if (bookIndex === -1) {
        return res.status(404).json({
            success: false,
            error: 'Book not found'
        });
    }

    // splice removes items from an array
    const deleteBook = authors.splice(bookIndex, 10);

    // shows us the deleted book
    res.status(200).json({
        success: true,
        data: deleteBook[0]
    });

});

export default router;