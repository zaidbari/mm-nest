import { Test, TestingModule } from '@nestjs/testing'
import { UsersService } from './users.service'
import { DatabaseService } from '@app/database/database.service'

describe('UsersService', () => {
	let service: UsersService
	let mockDb: any

	beforeEach(async () => {
		mockDb = {
			user: {
				findUniqueOrThrow: jest.fn(),
			},
		}

		const module: TestingModule = await Test.createTestingModule({
			providers: [UsersService, { provide: DatabaseService, useValue: mockDb }],
		}).compile()

		service = module.get<UsersService>(UsersService)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})

	it('_findOneById should return a user', async () => {
		const testId = 'testId'
		const testUser = { id: testId, username: 'testUser' }
		mockDb.user.findUniqueOrThrow.mockResolvedValue(testUser)

		expect(await service.findOneById(testId)).toBe(testUser)
		expect(mockDb.user.findUniqueOrThrow).toHaveBeenCalledWith({ where: { id: testId } })
	})

	it('_findOneByUsername should return a user', async () => {
		const testUsername = 'testUser'
		const testUser = { id: 'testId', username: testUsername }
		mockDb.user.findUniqueOrThrow.mockResolvedValue(testUser)

		expect(await service.findOneByUsername(testUsername)).toBe(testUser)
		expect(mockDb.user.findUniqueOrThrow).toHaveBeenCalledWith({ where: { username: testUsername } })
	})
})
