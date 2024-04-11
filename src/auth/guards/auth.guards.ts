import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'
import { jwtConstants } from '../constants/auth'
import { Reflector } from '@nestjs/core'
import { IS_PUBLIC_KEY } from '../constants/keyDecorators'
@Injectable()
export default class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>(
      IS_PUBLIC_KEY,
      context.getHandler(),
    )
    if (isPublic) return true

    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)

    if (!token) {
      throw new UnauthorizedException()
    }

    try {
      const payload = this.jwtService.verify(token, {
        secret: jwtConstants.secret,
      })

      request['user'] = payload
    } catch (error) {
      throw new UnauthorizedException()
    }

    return true
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers?.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
