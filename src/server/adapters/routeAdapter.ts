import { Request, Response } from 'express'
import { IControler } from '../../application/interfaces/IControler'

export function routeAdapter(controller: IControler) {
  return async (req: Request, res: Response) => {
    const { statusCode, body } = await controller.handle({ body: req.body })

    res.status(statusCode).json(body)
  }
}
