import { SetMetadata } from '@nestjs/common'
import { ROLES_KEY } from '../constants/keyDecorators'

export const Roles = (...roles: Array<keyof typeof Roles>) =>
  SetMetadata(ROLES_KEY, roles)
