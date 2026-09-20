import type { Request, Response, NextFunction } from "express";


export const errorHandler = (
    err: Error, // tells express that this is an error-handling middleware
    req: Request,
    res: Response,
    next: NextFunction
) => {

    console.error(err.message);

    res.status(500).json({
        success: false,
        error: 'Internal server error'
    });
};