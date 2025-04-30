import { z, ZodError } from 'zod'
import { IControler, IRequest, IResponse } from '../interfaces/IControler'
import { SignInUseCase } from '../use-cases/sign-in.use-case'
import { InvalidCrendentials } from '../errors/InvalidCredentials'

const schema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(8),
})

export class SignInController implements IControler {
  constructor(private readonly signInUseCase: SignInUseCase) {}

  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const { email, password } = schema.parse(body)

      const { accessToken } = await this.signInUseCase.execute({
        email,
        password,
      })

      return {
        statusCode: 200,
        body: {
          accessToken,
        },
      }
    } catch (error) {
      switch (error.constructor) {
        case ZodError:
          return {
            statusCode: 400,
            body: error.issues,
          }
        case InvalidCrendentials:
          return {
            statusCode: 401,
            body: {
              error: 'Invalid credentials.',
            },
          }
      }

      throw error
    }
  }
}
