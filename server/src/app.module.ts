import { User } from './users/users.model';

import { Module } from '@nestjs/common'

import { ConfigModule } from '@nestjs/config'

import { SequelizeModule } from '@nestjs/sequelize'

import { UsersModule } from './users/users.module';

import { AuthModule } from './auth/auth.module';

import { RefreshToken } from './auth/refresh-token.model'

import { RolesModule } from './roles/roles.module';

import { Role } from './roles/roles.model'

import { UserRoles } from './roles/user-roles.model'

import { ProjectsModule } from './projects/projects.module';

import { Project } from './projects/projects.model'

import { FilesModule } from './files/files.module';

import { ServeStaticModule } from '@nestjs/serve-static'

import * as path from 'path'

import { Comment } from './projects/comments.model'


@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),

    SequelizeModule.forRoot({
      dialect: 'postgres',

      host: process.env.DB_HOST,

      port: Number(process.env.DB_PORT),

      username: process.env.DB_USERNAME,

      password: process.env.DB_PASSWORD,

      database: process.env.DB_NAME,

      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },

      models: [
        User,
        RefreshToken,
        Role,
        UserRoles,
        Project,
        Comment
      ],

      synchronize: false,

      autoLoadModels: true,
    }),

    UsersModule,

    AuthModule,

    RolesModule,

    ProjectsModule,

    FilesModule

  ],
})

export class AppModule {}