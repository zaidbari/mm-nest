import { USER_ROLES } from '@app/types/enums'
import { ApiProperty } from '@nestjs/swagger'
import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'

export class CreateUserDto {
	@ApiProperty() // This decorator from the @nestjs/swagger package is used to annotate additional metadata for the Swagger UI documentation and OpenAPI schema.
	@IsString() // This decorator ensures that the value of the property is a string.
	@IsNotEmpty() // This decorator ensures that the value of the property is not empty.
	@MaxLength(100) // This decorator ensures that the string length is at most the specified number. For username, the maximum length is 100.
	username: string

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	@MinLength(8) // This decorator ensures that the string length is at least the specified number. For password, it's 8.
	@MaxLength(32)
	password: string

	@ApiProperty()
	@IsEmail() // This decorator ensures that the value of the property is a valid email address.
	@IsNotEmpty()
	@MaxLength(255)
	email: string

	@ApiProperty()
	@IsEnum(USER_ROLES) // This decorator ensures that the value of the property is one of the specified enum values.
	@IsNotEmpty()
	role: 'USER' | 'ADMIN' | 'SUPERADMIN' | 'GUEST'

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	@MaxLength(255)
	name: string

	@ApiProperty()
	@IsDate() // This decorator ensures that the value of the property is a valid date.
	expiresAt: Date
}
