import { forwardRef, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { SequelizeModule } from '@nestjs/sequelize'
import { UsersModule } from 'src/users/users.module'
import { RolesAuthGuard } from '../auth/roles-auth.guard'
import { RolesService } from './roles.service'
import { Role } from './roles.model'
import { UserRoles } from './user-roles.model'

@Module({
  imports: [
    ConfigModule,

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_ACCESS_SECRET'),
      }),
    }),

    SequelizeModule.forFeature([
      Role,
      UserRoles,
    ]),

    forwardRef(() => UsersModule),
  ],

  providers: [
    RolesService,
    RolesAuthGuard,
  ],

  exports: [
    RolesService,
    RolesAuthGuard,
  ],
})
export class RolesModule {}