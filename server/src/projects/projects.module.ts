import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { Project } from './projects.model'
import { SequelizeModule } from '@nestjs/sequelize'
import { FilesService } from 'src/files/files.service'
import { Comment } from './comments.model'
import { AuthModule } from 'src/auth/auth.module'
import { FilesModule } from 'src/files/files.module'

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService],
  imports: [
    SequelizeModule.forFeature([
      Project,
      Comment
    ]),
    AuthModule,
    FilesModule
  ]
})
export class ProjectsModule {}
