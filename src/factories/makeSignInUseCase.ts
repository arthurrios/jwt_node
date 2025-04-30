import { SignInUseCase } from '../application/use-cases/sign-in.use-case'
export function makeSignInUseCase() {
  return new SignInUseCase()
}
