import { forwardRef, Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UsersModule } from 'src/users/users.module'
import { JwtModule } from '@nestjs/jwt'
import { SequelizeModule } from '@nestjs/sequelize'
import { RefreshToken } from './refresh-token.model'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { FilesModule } from 'src/files/files.module'

@Module({
	controllers: [AuthController],
	providers: [AuthService],
	imports: [
		forwardRef(() => UsersModule),
		ConfigModule,
		SequelizeModule.forFeature([
			RefreshToken
		]),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				secret: configService.get<string>('POSTGRES_SECRET'),
				signOptions: {
					expiresIn: '24h'
				}
			})
		}),
		FilesModule
	],
	exports: [
		AuthService,
		JwtModule
	]
})
export class AuthModule {}
