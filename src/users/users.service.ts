import { Injectable } from '@nestjs/common'
import { DatabaseService } from '@app/database/database.service'
import { CreateUserDto } from './dto/create-user.dto'
import * as bcrypt from 'bcrypt'

export const roundsOfHashing = 10

@Injectable()
export class UsersService {
	// This is the constructor for the UsersService class. It takes an instance of the DatabaseService as a parameter.
	constructor(private db: DatabaseService) {}

	// This method takes an ID as a parameter and returns a Promise of a UserEntity.
	async findOneById(id: string) {
		// This method calls the findUniqueOrThrow method of the DatabaseService and returns the result as a UserEntity.
		return await this.db.user.findUniqueOrThrow({ where: { id } })
	}

	// This method takes a username as a parameter and returns a Promise of a UserEntity.
	async findOneByUsername(username: string) {
		// This method calls the findUniqueOrThrow method of the DatabaseService and returns the result as a UserEntity.
		return await this.db.user.findUniqueOrThrow({ where: { username: username } })
	}

	// This method takes an email as a parameter and returns a Promise of a UserEntity.
	async findOneByEmail(email: string) {
		// This method calls the findUniqueOrThrow method of the DatabaseService and returns the result as a UserEntity.
		return await this.db.user.findUniqueOrThrow({ where: { email } })
	}

	// This method takes a CreateUserDto object as a parameter and returns a Promise of a UserEntity.
	async create(createUserDto: CreateUserDto) {
		// This method hashes the password in the CreateUserDto object.
		const hashedPassword = await bcrypt.hash(createUserDto.password, roundsOfHashing)

		// This method sets the password in the CreateUserDto object to the hashed password.
		createUserDto.password = hashedPassword

		// This method calls the create method of the DatabaseService and returns the result as a UserEntity.
		return await this.db.user.create({ data: createUserDto })
	}

	// This method returns a Promise of an array of UserEntity.
	async findAll() {
		// This method calls the findMany method of the DatabaseService and returns the result as an array of UserEntity.
		return await this.db.user.findMany()
	}

	// This method takes an ID and a CreateUserDto object as parameters and returns a Promise of a UserEntity.
	async findOne(id: string) {
		// This method calls the findOneById method of the UsersService and returns the result as a UserEntity.
		return await this.findOneById(id)
	}

	// This method takes an ID and a CreateUserDto object as parameters and returns a Promise of a UserEntity.
	async update(id: string, updateUserDto: CreateUserDto) {
		// This method hashes the password in the CreateUserDto object.
		if (updateUserDto.password) {
			updateUserDto.password = await bcrypt.hash(updateUserDto.password, roundsOfHashing)
		}

		// This method calls the update method of the DatabaseService and returns the result as a UserEntity.
		return await this.db.user.update({ where: { id }, data: updateUserDto })
	}

	// This method takes an ID as a parameter and returns a Promise of a UserEntity.
	async remove(id: string) {
		// This method calls the delete method of the DatabaseService and returns the result as a UserEntity.
		return await this.db.user.delete({ where: { id } })
	}
}
