import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { RolesService } from 'src/roles/roles.service'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './users.model'

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User) private userRepository: typeof User,
		private readonly rolesService: RolesService
	) {}

	async createUser(dto: CreateUserDto) {
		const user = await this.userRepository.create(dto)
		const role = await this.rolesService.getRoleByValue('ADMIN')
		if (role) {
			await user.$set('roles', [role._id])
		} else {
			throw new HttpException('Не найден роль USER', HttpStatus.NOT_FOUND)
		}
		return user
	}

	async getUserByEmail(email: string) {
		const user = await this.userRepository.findOne({
			where: {
				email
			}
		})

		return user
	}

	async getUserByUsername(username: string) {
		return this.userRepository.findOne({
			where: {
				username
			}
		})
	}

	async getUserById(id: string) {
		const user = await this.userRepository.findByPk(id, {
			include: {
				all: true
			}
		})

		return user
	}

	async getAllUsers() {
		return this.userRepository.findAll({
			include: {
				all: true
			}
		})
	}
}
