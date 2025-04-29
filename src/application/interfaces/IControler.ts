import { ZodIssue } from 'zod'

export interface IRequest {
  body: Record<string, unknown>
}

export interface IResponse {
  statusCode: number
  body: Record<string, unknown> | ZodIssue[] | null
}

export interface IControler {
  handle(request: IRequest): Promise<IResponse>
}
