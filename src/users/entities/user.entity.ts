import { ApiProperty } from '@nestjs/swagger'
import { RoleType, User } from '@prisma/client'
import { Exclude } from 'class-transformer'

export class UserEntity implements User {
	// This is the UserEntity class. It implements the User interface from the Prisma client.
	constructor(partial: Partial<UserEntity>) {
		// This is the constructor for the UserEntity class. It takes a partial object as a parameter.
		Object.assign(this, partial) // This method assigns the properties of the partial object to the UserEntity object.
	}

	@ApiProperty()
	id: string

	@ApiProperty()
	email: string

	@ApiProperty()
	username: string

	@ApiProperty()
	name: string

	@ApiProperty({ type: Date, format: 'date' })
	createdAt: Date

	@ApiProperty({ type: Date, format: 'date' })
	updatedAt: Date

	@ApiProperty({ enum: RoleType })
	role: 'USER' | 'ADMIN' | 'SUPERADMIN' | 'GUEST'

	@ApiProperty({ type: Date, format: 'date', required: false })
	expiresAt: Date | null

	@Exclude()
	password: string
}
