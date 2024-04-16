import { DocumentBuilder } from '@nestjs/swagger'

// This is the configuration for the Swagger API documentation.
export const swaggerConfig = new DocumentBuilder().setTitle('Musicmind API').addBearerAuth().setVersion('1.0').build()
