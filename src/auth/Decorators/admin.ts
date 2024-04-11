import { SetMetadata } from '@nestjs/common'
import { ADMIN_KEY } from '../constants/keyDecorators'
import { ROLES } from '../constants/roles'

export const AdminAcces = () => SetMetadata(ADMIN_KEY, ROLES.ADMIN)
