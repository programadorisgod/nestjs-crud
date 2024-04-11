import { IS_PUBLIC_KEY } from './../constants/keyDecorators'
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ROLES } from '../constants/roles'
import { ADMIN_KEY, ROLES_KEY } from '../constants/keyDecorators'
import { Request } from 'express'
@Injectable()
export default class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): Promise<boolean> | boolean {
    const isPublic = this.reflector.get<boolean>(
      IS_PUBLIC_KEY,
      context.getHandler(),
    )

    if (isPublic) return true

    const roles = this.reflector.get<Array<keyof typeof ROLES>>(
      ROLES_KEY,
      context.getHandler(),
    )
    const admin = this.reflector.get<string>(ADMIN_KEY, context.getHandler())

    const request = context.switchToHttp().getRequest<Request>()

    const { user } = request
    const { role: roleUser } = user

    if (roles === undefined) {
      if (!admin) {
        return true
      }

      if (admin && roleUser === admin) {
        return true
      } else {
        throw new UnauthorizedException(
          'No tienes permisos para realizar esta operación',
        )
      }
    }

    if (roles && roleUser === ROLES.ADMIN) {
      return true
    }

    const isAuth = roles.some((role) => role === roleUser)

    if (!isAuth) {
      throw new UnauthorizedException(
        'No tienes permisos para realizar esta operación',
      )
    }

    return true
  }
}
