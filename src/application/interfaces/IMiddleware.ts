import { ZodIssue } from 'zod'

export interface IRequest {
  headers: Record<string, string>
}

export interface IResponse {
  statusCode: number
  body: Record<string, unknown> | ZodIssue[] | null
}

export interface IData {
  data: Record<string, unknown>
}

export interface IMiddleware {
  handle(req: IRequest): Promise<IResponse | IData>
}
