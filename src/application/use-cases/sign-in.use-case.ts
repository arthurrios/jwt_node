import { compare } from 'bcryptjs'
import { InvalidCrendentials } from '../errors/InvalidCredentials'
import { prismaClient } from '../lib/prisma/prismaClient'
import { sign } from 'jsonwebtoken'
import { env } from '../../config/env'

interface IInput {
  email: string
  password: string
}

interface IOutput {
  accessToken: string
}

export class SignInUseCase {
  async execute({ email, password }: IInput): Promise<IOutput> {
    const account = await prismaClient.account.findUnique({
      where: {
        email,
      },
    })

    if (!account) {
      throw new InvalidCrendentials()
    }

    const isPasswordValid = await compare(password, account.password)

    if (!isPasswordValid) {
      throw new InvalidCrendentials()
    }

    const accessToken = sign(
      { sub: account.id, role: account.roleId },
      env.jwtSecret,
      {
        expiresIn: '1d',
      },
    )

    return { accessToken }
  }
}
