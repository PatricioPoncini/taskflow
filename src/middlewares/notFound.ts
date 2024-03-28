import { Request, Response, NextFunction } from 'express'

export const notFoundHandler = (req: Request, res: Response) => {
  const message = 'Resource not found'

  res.status(404).send(message)
}