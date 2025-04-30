import { ZodIssue } from 'zod'

export interface IRequest {
  body: Record<string, unknown>
  accountId: string | undefined
}

export interface IResponse {
  statusCode: number
  body: Record<string, unknown> | ZodIssue[] | null
}

export interface IController {
  handle(req: IRequest): Promise<IResponse>
}
