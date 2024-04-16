import { NestFactory, Reflector } from '@nestjs/core'
import { SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './app.module'
import { swaggerConfig } from './config/swagger'
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common'

async function bootstrap() {
	const app = await NestFactory.create(AppModule) // This method creates a new Nest application instance.

	// This method adds a global validation pipe to the application.
	app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
	// This method adds a global class serializer interceptor to the application.
	app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))

	const document = SwaggerModule.createDocument(app, swaggerConfig) // This method creates a Swagger document for the application.
	SwaggerModule.setup('api', app, document) // This method sets up the Swagger UI for the application.

	await app.listen(process.env.PORT || 3000) // This method starts the application and listens for incoming requests.
}
bootstrap() // This method calls the bootstrap function to start the application.
