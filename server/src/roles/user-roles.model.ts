import { DataTypes, Optional } from 'sequelize'
import { Column, ForeignKey, Model, Table } from 'sequelize-typescript'
import { Role } from './roles.model'
import { User } from 'src/users/users.model'

interface IUserRoles {
	_id: string
	userId: string
	roleId: string
}

interface IUserRolesCreation extends Optional<IUserRoles, '_id'> {}

@Table({
	tableName: 'user_roles',
	createdAt: false,
	updatedAt: false,
})
export class UserRoles extends Model<IUserRoles, IUserRolesCreation> {
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

	@ForeignKey(() => User)
	@Column({
		type: DataTypes.UUID,
		allowNull: false,
	})
	declare userId: string

	@ForeignKey(() => Role)
	@Column({
		type: DataTypes.UUID,
		allowNull: false,
	})
	declare roleId: string
}