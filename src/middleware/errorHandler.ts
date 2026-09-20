import type { Request, Response, NextFunction } from "express";

// allows an optional status codes
type AppError = Error & {
    status?: number;
};

export const errorHandler = (
    err: AppError, // tells express that this is an error-handling middleware
    req: Request,
    res: Response,
    next: NextFunction
) => {

    console.error(err.message);

    if (err.status === 400) {
        return res.status(400).json({
            success: false,
            error: 'Invalid JSON'
        });
    }

    res.status(500).json({
        success: false,
        error: 'Internal server error'
    });
};