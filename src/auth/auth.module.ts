import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './jwt.strategy'
import { UsersModule } from '@app/users/users.module'
import { DatabaseModule } from '@app/database/database.module'

@Module({
	imports: [
		// This property is used to define the modules that should be imported into the module.
		PassportModule, // This module is used to provide Passport functionality to the application.
		UsersModule, // This module is used to define the users module for the application.
		DatabaseModule, // This module is used to define the database module for the application.
		JwtModule.register({
			// This module is used to provide JWT functionality to the application.
			secret: process.env.JWT_SECRET, // This property is used to define the secret key for the JWT module.
			signOptions: { expiresIn: '5m' }, // This property is used to define the sign options for the JWT module.
		}),
	],
	providers: [AuthService, JwtStrategy], // This property is used to define the providers for the module.
	controllers: [AuthController], // This property is used to define the controllers for the module.
})
export class AuthModule {}
