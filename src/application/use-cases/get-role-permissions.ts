import { prismaClient } from '../lib/prisma/prismaClient'

interface IInput {
  roleId: string
}

interface IOutput {
  permissionCodes: string[]
}

export class GetRolePermissionsUseCase {
  async execute({ roleId }: IInput): Promise<IOutput> {
    const rolePermissions = await prismaClient.rolePermission.findMany({
      where: {
        roleId,
      },
      select: { permissionCode: true },
    })

    const permissionCodes = rolePermissions.map(
      (rolePermission) => rolePermission.permissionCode,
    )

    return {
      permissionCodes,
    }
  }
}
