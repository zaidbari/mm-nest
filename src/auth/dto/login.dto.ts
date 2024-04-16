/**
 * This file defines a Data Transfer Object (DTO) for a login operation.
 * DTOs are a way to define how data will be sent over the network.
 *
 * The LoginDto class has two properties: username and password. Both are of type string and are marked as readonly,
 * which means they can't be modified after they are initialized.
 *
 * The decorators above the properties are used for validation and documentation purposes:
 * - @IsNotEmpty(): This decorator from the class-validator package ensures that the value of the property is not empty.
 * - @IsString(): This decorator ensures that the value of the property is a string.
 * - @MinLength(): This decorator ensures that the string length is at least the specified number. For username, the minimum length is 4, and for password, it's 6.
 * - @ApiProperty(): This decorator from the @nestjs/swagger package is used to annotate additional metadata for the Swagger UI documentation and OpenAPI schema.
 *
 * This DTO is likely used in a controller to validate incoming requests and provide meaningful error messages if the incoming data does not match the expected format. It also helps in generating API documentation.
 */
import { IsString, IsNotEmpty, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class LoginDto {
	@IsNotEmpty() // This decorator ensures that the value of the property is not empty.
	@IsString() // This decorator ensures that the value of the property is a string.
	@MinLength(4) // This decorator ensures that the string length is at least the specified number. For username, the minimum length is 4.
	@ApiProperty({
		// This decorator from the @nestjs/swagger package is used to annotate additional metadata for the Swagger UI documentation and OpenAPI schema.
		description: 'Enter username',
	})
	readonly username: string // This property is of type string and is marked as readonly, which means it can't be modified after it is initialized.

	@IsString() // This decorator ensures that the value of the property is a string.
	@IsNotEmpty() // This decorator ensures that the value of the property is not empty.
	@MinLength(6) // This decorator ensures that the string length is at least the specified number. For password, it's 6.
	@ApiProperty() // This decorator from the @nestjs/swagger package is used to annotate additional metadata for the Swagger UI documentation and OpenAPI schema.
	readonly password: string // This property is of type string and is marked as readonly, which means it can't be modified after it is initialized.
}
