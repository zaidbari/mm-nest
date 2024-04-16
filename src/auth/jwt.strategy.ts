//src/auth/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UsersService } from '@app/users/users.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
	// This class is used to define the JWT strategy for the application.
	constructor(private usersService: UsersService) {
		super({
			// This method is used to define the options for the JWT strategy.
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // This property is used to define the method for extracting the JWT from the request.
			secretOrKey: process.env.JWT_SECRET, // This property is used to define the secret key for the JWT strategy.
		})
	}

	async validate(payload: { id: string }) {
		// This method is used to validate the JWT payload.
		const user = await this.usersService.findOneById(payload.id) // This method calls the findOneById method of the UsersService and returns the result as a user.

		if (!user) throw new UnauthorizedException() // This method throws an UnauthorizedException if no user is found.

		return user // This method returns the user.
	}
}
