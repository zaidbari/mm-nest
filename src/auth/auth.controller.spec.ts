import { Test, TestingModule } from '@nestjs/testing'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service' // import AuthService
import { DatabaseService } from '@app/database/database.service' // import DatabaseService
import { JwtService } from '@nestjs/jwt' // import JwtService

describe('AuthController', () => {
	let controller: AuthController

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AuthController],
			providers: [
				AuthService,
				DatabaseService, // Add DatabaseService to providers array
				{ provide: JwtService, useValue: {} }, // Mock JwtService
			],
		}).compile()

		controller = module.get<AuthController>(AuthController)
	})

	it('should be defined', () => {
		expect(controller).toBeDefined()
	})
})
