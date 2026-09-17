import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from 'src/users/users.service'
import { ROLES_KEY } from './role-auth.decorator'

@Injectable()
export class RolesAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      // Получаем роли, которые нужны для этого endpoint
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      )

      // Если @Roles() нет — пропускаем пользователя
      if (!requiredRoles || requiredRoles.length === 0) {
        return true
      }

      const req = context.switchToHttp().getRequest()

      // Получаем Authorization header
      const authHeader = req.headers.authorization

      if (!authHeader) {
        throw new UnauthorizedException(
          'Authorization header отсутствует',
        )
      }

      // Bearer TOKEN
      const [bearer, token] = authHeader.split(' ')

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException(
          'Неверный формат токена',
        )
      }

      // Проверяем ACCESS TOKEN
      const payload = await this.jwtService.verifyAsync<{
        id: string
        username: string
        email: string
      }>(token, {
        secret: this.configService.getOrThrow<string>(
          'JWT_ACCESS_SECRET',
        ),
      })

      // Получаем настоящего пользователя из БД
      // вместе с его ролями
      const user = await this.usersService.getUserById(payload.id)

      if (!user) {
        throw new UnauthorizedException(
          'Пользователь не найден',
        )
      }

      // Проверяем, есть ли у пользователя
      // хотя бы одна необходимая роль
      const hasRole = user.roles.some((role) =>
        requiredRoles.includes(role.role),
      )

      if (!hasRole) {
        throw new HttpException(
          'Недостаточно прав',
          HttpStatus.FORBIDDEN,
        )
      }

      // Сохраняем пользователя в request,
      // чтобы потом его можно было получить через req.user
      req.user = user

      return true
    } catch (error) {
      if (
        error instanceof UnauthorizedException ||
        error instanceof HttpException
      ) {
        throw error
      }
      throw new UnauthorizedException(
        'Неверный или истёкший токен',
      )
    }
  }
}