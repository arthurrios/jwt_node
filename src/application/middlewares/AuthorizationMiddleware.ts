import { IData, IMiddleware, IResponse } from '../interfaces/IMiddleware'
import { IRequest } from '../interfaces/IRequest'
import { GetRolePermissionsUseCase } from '../use-cases/get-role-permissions'

export class AuthorizationMiddleware implements IMiddleware {
  constructor(
    private readonly requiredPermissions: string[],
    private readonly getRolePermissionsUseCase: GetRolePermissionsUseCase,
  ) {}

  async handle({ account }: IRequest): Promise<IResponse | IData> {
    if (!account) {
      return {
        statusCode: 403,
        body: {
          error: 'Access denied.',
        },
      }
    }

    const { permissionCodes } = await this.getRolePermissionsUseCase.execute({
      roleId: account.role,
    })

    const isAllowed = this.requiredPermissions.some((code) =>
      permissionCodes.includes(code),
    )

    if (!isAllowed) {
      return {
        statusCode: 403,
        body: {
          error: 'Access denied.',
        },
      }
    }

    return {
      data: {},
    }
  }
}
