import { Body, Controller, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service'
import { CreateUserDto } from 'src/users/dto/create-user.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { JwtAuthGuard } from './jwt-auth.guard'

@Controller('auth')
export class AuthController {

	constructor(private authService: AuthService,) {}

	@UseInterceptors(FileInterceptor('avatar'))
	@Post('registration')
	registration(
		@Body() dto: CreateUserDto,
		@UploadedFile() avatar: Express.Multer.File
	) {
		return this.authService.registration(
			dto,
			avatar
		)
	}

	@Post('login')
	login(@Body() dto: CreateUserDto) {
		return this.authService.login(dto)
	}

	@UseGuards(JwtAuthGuard)
	@Post('logout')
  logout(@Req() req: any) {
    return this.authService.logout(req.user.id)
  }

	@UseGuards(JwtAuthGuard)
	@Post('refresh')
	refresh(@Body('refreshToken') refreshToken: string) {
		return this.authService.refreshToken(refreshToken)
	}
}
