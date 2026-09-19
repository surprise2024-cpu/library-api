import { Router } from "express";
import { authors } from "../data/store.js";

// creating a new router object
const router = Router();

// creating the post route
router.post('/', (req, res) => {

    // gets the name from the JSON body
    const { name } = req.body;

    // new object representing an author
    const newAuthor = {
        id: authors.length + 1,
        name
    };

    // adds the new author to the end of the authors array
    authors.push(newAuthor);

    // sends a status 201 response which basicaly means the object was successfully created
    res.status(201).json({
        success: true,
        data: newAuthor
    });
});

// router for getting/displaying all the authors
router.get('/', (req, res) => {

    res.status(200).json({
        success: true,
        data: authors
    });
});

// router for getting an author by their id
router.get('/:id', (req, res) => {

    const id = Number(req.params.id);

    const author = authors.find((author) => author.id === id );

    if (!author) {

        return res.status(404).json({
            success: false,
            error: 'Author not found'
        });
    }

    res.status(200).json({
        success: true,
        data: author
    });

});

// router to update an authors information
router.put('/:id', (req, res) => {

    const id = Number(req.params.id);

    const author = authors.find((author) => author.id === id);

    if (!author) {
        return res.status(404).json({
            success: false,
            error: 'Author not found'
        });
    }

    const { name } = req.body;

    author.name = name;

    res.status(200).json({
        success: true,
        data: author
    });

});

// route for deleting an author using their id
router.delete('/:id', (req, res) => {

    const id = Number(req.params.id);

    const authorIndex = authors.findIndex((author) => author.id === id);

    if (authorIndex === -1) {
        return res.status(404).json({
            success: false,
            error: 'Author not found'
        });
    }

    // splice removes items from an array
    const deleteAuthor = authors.splice(authorIndex, 10);

    res.status(200).json({
        success: true,
        data: deleteAuthor[0]
    });
});

// makes the router available to use all over the app
export default router;