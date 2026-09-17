import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Project } from './projects.model'
import { ProjectCreatingDto } from './dto/project-creating.dto'
import { Comment } from './comments.model'
import { CommentCreationDto } from './dto/comment-creation.dto'
import { Op } from 'sequelize'
import { FilesService } from 'src/files/files.service'

@Injectable()
export class ProjectsService {
	constructor(
		@InjectModel(Project)
		private readonly projectRepository: typeof Project,

		@InjectModel(Comment)
		private readonly commentRepository: typeof Comment,

		private readonly filesService: FilesService
	) {}

	async createProject(
		dto: ProjectCreatingDto,
		image: Express.Multer.File,
		userId: string
	) {
		const fileName = await this.filesService.createFile(image)

		const project = await this.projectRepository.create({
			...dto,
			image: fileName,
			userId,
			likes: 0
		})

		return project
	}

	async getProjectByID(id: string) {
		const project = await this.projectRepository.findByPk(id)

		if (!project) {
			throw new HttpException('Не найден проект', HttpStatus.NOT_FOUND)
		}

		const comments = await this.commentRepository.findAll({
			where: {
				projectId: id
			},
			order: [['createdAt', 'DESC']]
		})

		return {
			...project.toJSON(),
			comments
		}
	}

	async getProjects(page: number, limit: number) {
		const offset = (page - 1) * limit

		const { rows, count } = await this.projectRepository.findAndCountAll({
			limit,
			offset,
			include: [
				{
					model: Comment
				}
			],
			order: [['createdAt', 'DESC']]
		})

		return {
			projects: rows,
			total: count,
			page,
			limit,
			totalPages: Math.ceil(count / limit)
		}
	}

	async deleteProject(id: string) {
		const project = await this.projectRepository.destroy({
			where: {
				_id: id
			}
		})

		return project
	}

	async addComment(dto: CommentCreationDto, id: string) {
		const project = await this.projectRepository.findByPk(id)

		if (!project) {
			throw new HttpException('Не найден проект', HttpStatus.NOT_FOUND)
		}

		const comment = await this.commentRepository.create({
			text: dto.text,
			projectId: id
		})

		return comment
	}

	async likes(id: string) {
		const project = await this.projectRepository.findByPk(id)

		if (!project) {
			throw new HttpException('Не найден проект', HttpStatus.NOT_FOUND)
		}

		project.likes += 1

		await project.save()
	}

	async unLikes(id: string) {
		const project = await this.projectRepository.findByPk(id)

		if (!project) {
			throw new HttpException('Не найден проект', HttpStatus.NOT_FOUND)
		}

		project.likes -= 1

		await project.save()
	}

	async search(query: string): Promise<Project[]> {
		const projects = await this.projectRepository.findAll({
			where: {
				name: {
					[Op.iLike]: `%${query}%`
				}
			},
			include: [
				{
					model: Comment
				}
			]
		})

		return projects
	}
}
