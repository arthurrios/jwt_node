import { GetRolePermissionsUseCase } from '../application/use-cases/get-role-permissions'

export function makeGetRolePermissionsUseCase() {
  return new GetRolePermissionsUseCase()
}
