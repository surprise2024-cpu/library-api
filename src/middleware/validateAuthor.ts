import type { Request, Response, NextFunction } from "express";

// creates and exports the middleware function
export const validateAuthor = (

    req: Request,
    res: Response,
    next: NextFunction // tells express to continue to the next middleware or route

) => {

    const { name } = req.body;

    if (!name || typeof name !== 'string' || name.trim()  === '') {
        return res.status(400).json({
            success: false,
            error: 'Author name is required'
        });
    }

    // makes the request continue to the actual route
    next();

};