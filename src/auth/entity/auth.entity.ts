import { ApiProperty } from '@nestjs/swagger'

export class TokensEntity {
	@ApiProperty()
	accessToken: string

	@ApiProperty()
	refreshToken: string
}

export class LoginResponse {
	@ApiProperty({ type: TokensEntity })
	tokens: {
		accessToken: string
		refreshToken: string
	}

	@ApiProperty()
	username: string

	@ApiProperty()
	role: string

	@ApiProperty()
	id: string
}
