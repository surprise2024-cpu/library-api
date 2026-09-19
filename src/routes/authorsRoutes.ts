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

// makes the router available to use all over the app
export default router;