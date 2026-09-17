import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto'
import { InjectModel } from '@nestjs/sequelize'
import { Role } from './roles.model'

@Injectable()
export class RolesService {

	constructor(
		@InjectModel(Role) private roleRepository: typeof Role
	) {}

	async createRole(roleDto: CreateRoleDto) {
		const role = await this.roleRepository.create(roleDto)
		return role
	}

	async getRoleByValue(role: string) {
		const storedRole = await this.roleRepository.findOne({
			where: {
				role
			}
		})
		return storedRole
	}
}
