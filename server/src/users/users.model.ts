import { DataTypes } from 'sequelize'
import { BelongsToMany, Column, DataType, HasMany, Model, Table } from 'sequelize-typescript'
import { RefreshToken } from 'src/auth/refresh-token.model'
import { Project } from 'src/projects/projects.model'
import { Role } from 'src/roles/roles.model'
import { UserRoles } from 'src/roles/user-roles.model'

interface IUser {
	name: string
	username: string
	email: string
	password: string
	description: string
}

@Table({
	tableName: 'users',
})
export class User extends Model<User, IUser> {

	@Column({
		type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
		unique: true,
		allowNull: false,
		autoIncrement: false,
		field: '_id'
	})
	declare _id: string

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	declare name: string

	@Column({
		type: DataType.STRING,
		allowNull: false,
		unique: true,
	})
	declare username: string

	@Column({
		type: DataType.STRING,
		allowNull: false,
		unique: true
	})
	declare email: string

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})	
	declare password: string

	@Column({
		type: DataType.TEXT,
		allowNull: true,
	})
	declare description: string

	@Column({
		type: DataType.STRING,
		allowNull: true
	})
	declare avatar: string

	@HasMany(() => RefreshToken)
	declare refreshTokens: RefreshToken[]

	@BelongsToMany(() => Role, () => UserRoles)
	declare roles: Role[]

	@HasMany(() => Project)
	declare projects: Project[]
}