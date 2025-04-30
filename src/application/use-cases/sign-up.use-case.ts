import { hash } from 'bcryptjs'
import { AccountAlreadyExists } from '../errors/AccountAlreadyExists'
import { prismaClient } from '../lib/prisma/prismaClient'
import { Role } from '../lib/prisma/generated'

interface IInput {
  name: string
  email: string
  password: string
  role: Role
}

type IOutput = void

export class SignUpUseCase {
  constructor(private readonly salt: number) {}

  async execute({ email, name, password, role }: IInput): Promise<IOutput> {
    const accountAlreadyExists = await prismaClient.account.findUnique({
      where: {
        email,
      },
    })

    if (accountAlreadyExists) {
      throw new AccountAlreadyExists()
    }

    const hashedPassword = await hash(password, this.salt)

    await prismaClient.account.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: 'USER',
      },
    })
  }
}
