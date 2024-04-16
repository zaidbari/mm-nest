import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtService } from '@nestjs/jwt'

describe('AuthService', () => {
	let service: AuthService
	let jwtService: JwtService

	beforeEach(async () => {
		const mockJwtService = {
			sign: jest.fn().mockReturnValue('testToken'),
		}

		const module: TestingModule = await Test.createTestingModule({
			controllers: [AuthController],
			providers: [
				AuthService,
				{ provide: JwtService, useValue: mockJwtService }, // Mock JwtService
			],
		}).compile()

		service = module.get<AuthService>(AuthService)
		jwtService = module.get<JwtService>(JwtService)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})

	describe('_generateTokens', () => {
		it('should call jwtService.sign with correct parameters', () => {
			const payload = { id: 'test-uuid', role: 'test-role', username: 'test-username' }

			service['_generateTokens'](payload)

			expect(jwtService.sign).toHaveBeenCalledWith(payload, { expiresIn: '5d', subject: 'access' })
			expect(jwtService.sign).toHaveBeenCalledWith(payload, { expiresIn: '30d', subject: 'refresh' })
		})

		it('should return an object with accessToken and refreshToken properties', () => {
			const result = service['_generateTokens']({ id: 'test-uuid', role: 'test-role', username: 'test-username' })

			expect(result).toHaveProperty('accessToken')
			expect(result).toHaveProperty('refreshToken')
		})
	})
})
