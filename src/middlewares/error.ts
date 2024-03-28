import { NextFunction, Request, Response } from "express"
import { CustomError } from "./common/httpException"

export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
	const status = err.statusCode || err.status || 500
	const message = err.message || "Something went wrong"

	res.status(status).json({ ...err, message })
}