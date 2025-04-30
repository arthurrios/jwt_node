import { SignInController } from '../application/controllers/sign-in.controller'
import { makeSignInUseCase } from './makeSignInUseCase'

export function makeSignInController() {
  const signInUseCase = makeSignInUseCase()

  return new SignInController(signInUseCase)
}
