import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service'
import { CreateRoleDto } from './dto/create-role.dto'
import { RolesAuthGuard } from 'src/auth/roles-auth.guard'
import { Roles } from 'src/auth/role-auth.decorator'

@Controller('roles')
export class RolesController {

	constructor(
		private readonly rolesService: RolesService
	) {}

	@UseGuards(RolesAuthGuard)
	@Roles('ADMIN')
	@Post()
	createRole(@Body() dto: CreateRoleDto) {
		return this.rolesService.createRole(dto)
	}

	@Get('/:role')
	getRoleByValue(@Param('role') role: string) {
		return this.rolesService.getRoleByValue(role)
	}
}
