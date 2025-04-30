import { UseCaseError } from './UseCaseError'

export class AccountAlreadyExists extends Error implements UseCaseError {
  constructor() {
    super('This email is already in use.')
  }
}
