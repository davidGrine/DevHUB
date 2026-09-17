import { DataTypes } from 'sequelize'
import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript'
import { User } from 'src/users/users.model'
import { UserRoles } from './user-roles.model'

interface IRole {
	role: string
	description: string
}

@Table({
	tableName: 'roles',
})
export class Role extends Model<Role, IRole> {
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
		type: DataTypes.STRING,
		allowNull: false,
	})
	declare role: string

	@Column({
		type: DataTypes.TEXT,
		allowNull: true,
	})
	declare description: string

	@BelongsToMany(() => User, () => UserRoles)
	declare users: User[]
}