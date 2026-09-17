	import { DataTypes } from 'sequelize'
	import { BelongsTo, Column, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript'
	import { IComment } from 'src/types/comments.type'
	import { User } from 'src/users/users.model'
	import { Comment } from './comments.model'

	export interface ProjectCreationAttrs {
		name: string
		description: string
		image: string
		category: string
		likes: number
		comments: IComment[]
		userId: string
	}

	@Table({
		tableName: 'projects'
	})
	export class Project extends Model<Project, ProjectCreationAttrs> {
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
			allowNull: false
		})
		declare name: string

		@Column({
			type: DataTypes.STRING,
			allowNull: false
		})
		declare description: string

		@Column({
			type: DataTypes.STRING,
			allowNull: false
		})
		declare image: string

		@Column({
			type: DataTypes.INTEGER,
		})
		declare likes: number

		@Column({
			type: DataTypes.STRING,
		})
		declare category: string

		@BelongsTo(() => User)
		declare author: User

		@ForeignKey(() => User)
		@Column({
			type: DataTypes.UUID,
			allowNull: false,
		})
		declare userId: string

		@HasMany(() => Comment)
		declare comments: Comment[]
	}
