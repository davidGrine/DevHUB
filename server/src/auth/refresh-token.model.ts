import { DataTypes, Optional } from 'sequelize'
import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript'
import { User } from 'src/users/users.model'

interface IRefreshToken {
	_id: string,
	userId: string,
	token: string,
	tokenHash: string,
	expiresAt: Date,
}

interface IRefreshTokenCreation extends Optional<IRefreshToken, '_id'> {}

@Table({
	tableName: 'refresh_tokens',
})
export class RefreshToken extends Model<
	IRefreshToken,
	IRefreshTokenCreation
> {

	@Column({
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
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

	@BelongsTo(() => User)
	declare user: User

	@Column({
		type: DataTypes.STRING,
		allowNull: false,
	})
	declare token: string

	@Column({
		type: DataTypes.STRING,
		allowNull: false,
	})
	declare tokenHash: string

	@Column({
		type: DataTypes.DATE,
		allowNull: false,
	})
	declare expiresAt: Date
}