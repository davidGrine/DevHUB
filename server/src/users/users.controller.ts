import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { RolesAuthGuard } from 'src/auth/roles-auth.guard'
import { Roles } from 'src/auth/role-auth.decorator'

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  createUser(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto)
  }

  @Get()
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesAuthGuard)
  getAllUsers() {
    return this.usersService.getAllUsers()
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getCurrentUser(@Req() req: any) {
    return this.usersService.getUserById(req.user.id)
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id)
  }
}