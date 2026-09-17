import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as path from 'path'
import * as fs from 'fs'

const start = async () => {
  const app = await NestFactory.create(AppModule)

  const staticPath = path.resolve(__dirname, 'static')

  if (!fs.existsSync(staticPath)) {
    fs.mkdirSync(staticPath, {
      recursive: true,
    })
  }

  const PORT = process.env.PORT || 5000

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  })

  await app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}`)
  })
}

start()