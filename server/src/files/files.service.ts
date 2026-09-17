import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

import * as path from 'path';
import * as fs from 'fs';

import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FilesService {
  createFile(file: Express.Multer.File) {
    try {
			const fileExtension = path.extname(file.originalname)
			
      const fileName = `${uuidv4()}${fileExtension}`

      const filePath = path.resolve(
        __dirname,
        '..',
        'static',
      );

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, {
          recursive: true,
        });
      }

      fs.writeFileSync(
        path.resolve(filePath, fileName),
        file.buffer,
      );

      return fileName;
    } catch (error) {
      throw new HttpException(
        'Не удалось загрузить файл',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}