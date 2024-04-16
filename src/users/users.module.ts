import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'

@Module({
	// This decorator is used to define a new module.
	providers: [UsersService], // This property is used to define the providers for the module.
	controllers: [UsersController], // This property is used to define the controllers for the module.
	exports: [UsersService], // This property is used to define the providers that should be available for other modules to import.
})
export class UsersModule {}
