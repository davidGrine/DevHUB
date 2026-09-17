import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'

import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async canActivate(
    context: ExecutionContext
  ): Promise<boolean> {
    const req = context.switchToHttp().getRequest()

    try {
      const authHeader = req.headers.authorization

      if (!authHeader) {
        throw new UnauthorizedException(
          'Authorization header отсутствует'
        )
      }

      const [bearer, token] = authHeader.split(' ')

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException(
          'Неверный формат токена'
        )
      }

      const user = await this.jwtService.verifyAsync(token, {
        secret: this.configService.getOrThrow<string>(
          'JWT_ACCESS_SECRET'
        )
      })

      req.user = user

      return true
    } catch (error) {
      console.log(error)

      throw new UnauthorizedException(
        'Пользователь не авторизован'
      )
    }
  }
}