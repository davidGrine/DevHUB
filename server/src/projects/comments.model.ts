import { DataTypes } from 'sequelize'
import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript'
import { Project } from './projects.model'

interface IComment {
	text: string
	projectId: string
}

@Table({
	tableName: 'comments'
})
export class Comment extends Model<Comment, IComment> {
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
		type: DataTypes.TEXT,
		allowNull: false
	})
	declare text: string

	@ForeignKey(() => Project)
	@Column({
		type: DataTypes.UUID,
		allowNull: false,
	})
	declare projectId: string

	@BelongsTo(() => Project)
	declare project: Project
}