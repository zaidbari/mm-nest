import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { ApiCreatedResponse, ApiOkResponse, ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { UsersService } from './users.service'
import { UserEntity } from './entities/user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { JwtAuthGuard } from '@app/auth/jwt-auth.guard'
import { HasRoles } from '@app/auth/roles.decorator'
import { RolesGuard } from '@app/auth/roles.guard'
import { RoleType } from '@prisma/client'

@Controller('users') // This decorator is used to define the path for the controller.
@ApiTags('users')
export class UsersController {
	// This is the constructor for the UsersController class. It takes an instance of the UsersService as a parameter.
	constructor(private readonly usersService: UsersService) {}

	/* ---------------------------- Create a new user --------------------------- */
	// This decorator is used to define the HTTP request method and path for the create method.
	@Post()
	// This decorator from the @nestjs/swagger package is used to define the response schema for the create method.
	@ApiCreatedResponse({ type: UserEntity })
	// This decorator from the @nestjs/swagger package is used to define the response schema for the create method.
	@ApiOkResponse({ type: UserEntity })
	// This method takes a CreateUserDto object as a parameter and returns a Promise of a UserEntity.
	async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
		// This method calls the create method of the UsersService and returns the result as a UserEntity.
		return new UserEntity(await this.usersService.create(createUserDto))
	}

	/* ---------------------------- Get all users --------------------------- */
	// This decorator is used to define the HTTP request method and path for the findAll method.
	@Get() // This decorator is used to define the HTTP request method and path for the findAll method.
	@UseGuards(JwtAuthGuard, RolesGuard) // This decorator is used to define the guards for the findAll method.
	@ApiBearerAuth() // This decorator is used to define the authentication method for the findAll method.
	@ApiOkResponse({ type: UserEntity, isArray: true }) // This decorator is used to define the response schema for the findAll method.
	async findAll(): Promise<UserEntity[]> {
		// This method calls the findAll method of the UsersService and returns the result as an array of UserEntity.
		const users = await this.usersService.findAll()
		// This method maps the array of users to an array of UserEntity.
		return users.map(user => new UserEntity(user))
	}

	/* ---------------------------- Get a user by ID --------------------------- */
	@Get(':id') // This decorator is used to define the HTTP request method and path for the findOne method.
	@UseGuards(JwtAuthGuard) // This decorator is used to define the guards for the findOne method.
	@ApiBearerAuth() // This decorator is used to define the authentication method for the findOne method.
	@ApiOkResponse({ type: UserEntity }) // This decorator is used to define the response schema for the findOne method.
	async findOne(@Param('id') id: string): Promise<UserEntity> {
		// This method calls the findOne method of the UsersService and returns the result as a UserEntity.
		return new UserEntity(await this.usersService.findOne(id))
	}

	/* ---------------------------- Update a user by ID --------------------------- */
	@Patch(':id') // This decorator is used to define the HTTP request method and path for the update method.
	@UseGuards(JwtAuthGuard) // This decorator is used to define the guards for the update method.
	@ApiBearerAuth() // This decorator is used to define the authentication method for the update method.
	@ApiCreatedResponse({ type: UserEntity }) // This decorator is used to define the response schema for the update method.
	// This method takes an ID and a CreateUserDto object as parameters and returns a Promise of a UserEntity.
	async update(@Param('id') id: string, @Body() updateUserDto: CreateUserDto): Promise<UserEntity> {
		// This method calls the update method of the UsersService and returns the result as a UserEntity.
		return new UserEntity(await this.usersService.update(id, updateUserDto))
	}

	/* ---------------------------- Delete a user by ID --------------------------- */
	@Delete(':id') // This decorator is used to define the HTTP request method and path for the remove method.
	@HasRoles(RoleType.ADMIN) // This decorator is used to define the required roles for the remove method.
	@UseGuards(JwtAuthGuard, RolesGuard) // This decorator is used to define the guards for the remove method.
	@ApiBearerAuth() // This decorator is used to define the authentication method for the remove method.
	@ApiOkResponse({ type: UserEntity }) // This decorator is used to define the response schema for the remove method.
	// This method takes an ID as a parameter and returns a Promise of a UserEntity.
	async remove(@Param('id') id: string): Promise<UserEntity> {
		// This method calls the remove method of the UsersService and returns the result as a UserEntity.
		return new UserEntity(await this.usersService.remove(id))
	}
}
