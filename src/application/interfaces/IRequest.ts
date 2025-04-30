export interface IRequest {
  body: Record<string, unknown>
  headers: Record<string, string>
  account?: {
    id: string
    role: string
  }
}
