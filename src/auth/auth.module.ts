import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from './constants/auth'

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,

      global: true,
      signOptions: {
        expiresIn: '120s',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
