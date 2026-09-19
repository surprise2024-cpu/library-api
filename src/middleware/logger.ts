import type { Request, Response, NextFunction } from "express";

// creates and exports the middleware function
export const logger = (

    req: Request,
    res: Response,
    next: NextFunction // tells express to continue to the next middleware or route

) => {

    // prints the request method and url
    console.log(`${req.method} ${req.url}`);

    // makes the request continue to the actual route
    next();

};