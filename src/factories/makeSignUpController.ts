import { SignUpController } from '../application/controllers/sign-up.controller'
import { makeSignUpUseCase } from './makeSignUpUseCase'

export function makeSignUpController() {
  const signUpUseCase = makeSignUpUseCase()

  return new SignUpController(signUpUseCase)
}
