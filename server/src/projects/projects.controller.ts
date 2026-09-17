import { Body, Controller, Delete, Get, Param, Post, Query, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProjectsService } from './projects.service'
import { ProjectCreatingDto } from './dto/project-creating.dto'
import { CommentCreationDto } from './dto/comment-creation.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'

@Controller('projects')
export class ProjectsController {

	constructor(
		private readonly projectsService: ProjectsService
	) {}

	@Post()
	@UseInterceptors(FileInterceptor('image'))
	@UseGuards(JwtAuthGuard)
	createProject(
		@Body()projectDto: ProjectCreatingDto,
		@UploadedFile() image: Express.Multer.File,
		@Req() req
	) {
		console.log('IMAGE: ', image)
		
		return this.projectsService.createProject(
			projectDto,
			image, 
			req.user.id
		)
	}

	@Get('/search')
	search(@Query('query') query: string) {
		return this.projectsService.search(query)
	}

	@Get()
	getProjects(
		@Query('page') page: number = 1,
		@Query('limit') limit: number = 5,
	) {
		return this.projectsService.getProjects(
			Number(page),
			Number(limit),
		)
	}

	@Get(':id')
	getProjectByID(@Param('id') id: string) {
		return this.projectsService.getProjectByID(id)
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	deleteProject(@Param('id') id: string) {
		return this.projectsService.deleteProject(id)
	}

	@UseGuards(JwtAuthGuard)
	@Post('/comments/:id')
	addComment(@Body() dto: CommentCreationDto, @Param('id') id: string) {
		return this.projectsService.addComment(dto, id)
	}
}
