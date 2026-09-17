import {
	HttpException,
	HttpStatus,
	Injectable,
	UnauthorizedException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/sequelize'
import { randomUUID } from 'crypto'
import bcrypt from 'node_modules/bcryptjs'
import { CreateUserDto } from 'src/users/dto/create-user.dto'
import { User } from 'src/users/users.model'
import { UsersService } from 'src/users/users.service'
import { RefreshToken } from './refresh-token.model'
import { FilesService } from 'src/files/files.service'

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
		@InjectModel(RefreshToken)
		private refreshTokenRepository: typeof RefreshToken,
		private readonly filesService: FilesService
	) {}

	async registration(userDto: CreateUserDto, avatar: Express.Multer.File) {
		const candidate = await this.usersService.getUserByEmail(userDto.email)

		if (candidate) {
			throw new HttpException(
				'Пользователь с таким email уже зарегистрирован',
				HttpStatus.CONFLICT
			)
		}

		const usernameCandidate = await this.usersService.getUserByUsername(
			userDto.username
		)

		if (usernameCandidate) {
			throw new HttpException(
				'Пользователь с таким username уже зарегистрирован',
				HttpStatus.CONFLICT
			)
		}

		const hashPassword = await bcrypt.hash(userDto.password, 10)

		const fileName = await this.filesService.createFile(avatar)

		const user = await this.usersService.createUser({
			...userDto,
			password: hashPassword,
			avatar: fileName
		})

		return this.generateTokens(user)
	}

	async login(userDto: CreateUserDto) {
		const user = await this.usersService.getUserByEmail(userDto.email)

		if (!user)
			throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND)

		const isPasswordCorrect = await bcrypt.compare(
			userDto.password,
			user.password
		)

		if (!isPasswordCorrect)
			throw new HttpException('Неверный пароль', HttpStatus.UNAUTHORIZED)

		await this.refreshTokenRepository.destroy({
			where: {
				userId: user._id
			}
		})

		return this.generateTokens(user)
	}

	private async generateTokens(user: User) {
		const payload = {
			id: user._id,
			username: user.username,
			email: user.email
		}

		const accessToken = await this.jwtService.sign(payload, {
			secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
			expiresIn: '24h'
		})

		const refreshToken = await this.generateRefreshToken(user._id)

		return {
			accessToken,
			refreshToken
		}
	}

	private async generateRefreshToken(userId: string) {
		const token = randomUUID()

		const payload = {
			_id: userId,
			token
		}

		const refreshToken = await this.jwtService.sign(payload, {
			secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
			expiresIn: '7d'
		})

		const tokenHash = await bcrypt.hash(token, 10)

		const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

		await this.refreshTokenRepository.create({
			userId,
			token,
			tokenHash,
			expiresAt
		})

		return refreshToken
	}

	async refreshToken(refreshToken: string) {
		try {
			const payload = await this.jwtService.verify<{
				_id: string
				token: string
			}>(refreshToken, {
				secret: this.configService.get<string>('JWT_REFRESH_SECRET')
			})

			const storedToken = await this.refreshTokenRepository.findOne({
				where: {
					userId: payload._id,
					token: payload.token
				}
			})

			if (!storedToken)
				throw new HttpException('Токен не найден', HttpStatus.NOT_FOUND)

			if (new Date() > storedToken.expiresAt) {
				await storedToken.destroy()

				throw new HttpException('Токен устарел', HttpStatus.UNAUTHORIZED)
			}

			const isValid = await bcrypt.compare(payload.token, storedToken.tokenHash)

			if (!isValid)
				throw new HttpException(
					'Токен не действителен',
					HttpStatus.UNAUTHORIZED
				)

			const user = await this.usersService.getUserById(payload._id)

			if (!user) {
				throw new UnauthorizedException('Пользователь не найден')
			}

			await storedToken.destroy()

			return this.generateTokens(user)
		} catch (error: any) {
			throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
		}
	}

	async logout(userId: string) {
		await this.refreshTokenRepository.destroy({
			where: {
				userId
			}
		})

		return {
			message: 'Успешно'
		}
	}
}
