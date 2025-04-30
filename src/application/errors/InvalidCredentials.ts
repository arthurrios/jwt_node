import { UseCaseError } from './UseCaseError'

export class InvalidCrendentials extends Error implements UseCaseError {
  constructor() {
    super('Invalid credentials.')
  }
}
