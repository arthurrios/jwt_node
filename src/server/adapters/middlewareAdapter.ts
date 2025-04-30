import { NextFunction, Request, Response } from 'express'
import { IMiddleware } from '../../application/interfaces/IMiddleware'

export function middlewareAdapter(middleware: IMiddleware) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const result = await middleware.handle({
      body: req.body,
      account: req.metadata?.account,
      headers: req.headers as Record<string, string>,
    })

    if ('statusCode' in result) {
      const { statusCode, body } = result
      res.status(statusCode).json(body)
      return
    }

    req.metadata = {
      ...req.metadata,
      ...result.data,
    }

    next()
  }
}
