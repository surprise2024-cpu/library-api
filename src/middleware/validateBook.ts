import type { Request, Response, NextFunction } from "express";

// creates and exports the middleware function
export const validateBook = (

    req: Request,
    res: Response,
    next: NextFunction // tells express to continue to the next middleware or route

) => {


    const { title, year, authorId } = req.body;

    if (!title || typeof title !== 'string' || title.trim()  === '') {
        return res.status(400).json({
            success: false,
            error: 'Book title is required'
        });
    }

    if (year === undefined || typeof year !== 'number') {
        return res.status(400).json({
            success: false,
            error: 'Book year must be a number'
        });
    }

    if (authorId === undefined || typeof authorId !== 'number') {
        return res.status(400).json({
            success: false,
            error: 'authorId must be a number'
        });
    }

    // makes the request continue to the actual route
    next();

};