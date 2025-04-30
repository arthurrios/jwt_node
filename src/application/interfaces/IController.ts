import { ZodIssue } from 'zod'
import { IRequest } from './IRequest'

export interface IResponse {
  statusCode: number
  body: Record<string, unknown> | ZodIssue[] | null
}

export interface IController {
  handle(req: IRequest): Promise<IResponse>
}
