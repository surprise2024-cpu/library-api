import { Router } from "express";
import { authors, books } from "../data/store.js";
import { error } from "node:console";


const router = Router();

// creating the post route
router.post('/', (req, res) => {

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

export default router;