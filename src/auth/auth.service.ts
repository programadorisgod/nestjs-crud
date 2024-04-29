import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import AuthResponse from './interfaces/auth.interface'
import { ROLES } from './constants/roles'

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async signIn(): Promise<AuthResponse> {
    const id = crypto.randomUUID()
    const role = ROLES.BASIC

    const payload = { sub: id, role }

    return {
      acces_token: await this.jwtService.signAsync(payload, {
        algorithm: 'HS512',
      }),
    }
  }
}
