import { z, ZodError } from 'zod'
import { IControler, IRequest, IResponse } from '../interfaces/IControler'
import { SignUpUseCase } from '../use-cases/sign-up.use-case'
import { AccountAlreadyExists } from '../errors/AccountAlreadyExists'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email().min(1),
  password: z.string().min(8),
})

export class SignUpController implements IControler {
  constructor(private readonly signUpUseCase: SignUpUseCase) {}

  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const { email, name, password } = schema.parse(body)

      await this.signUpUseCase.execute({
        email,
        name,
        password,
      })

      return {
        statusCode: 204,
        body: null,
      }
    } catch (error) {
      switch (error.constructor) {
        case ZodError:
          return {
            statusCode: 400,
            body: error.issues,
          }
        case AccountAlreadyExists:
          return {
            statusCode: 409,
            body: {
              error: 'This email is already in use.',
            },
          }
      }

      throw error
    }
  }
}
