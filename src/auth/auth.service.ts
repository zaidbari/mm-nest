import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { TokensEntity, LoginResponse } from './entity/auth.entity'
import { DatabaseService } from '@app/database/database.service'

@Injectable()
export class AuthService {
	constructor(
		private db: DatabaseService, // This property is used to define the DatabaseService instance for the AuthService.
		private jwtService: JwtService, // This property is used to define the JwtService instance for the AuthService.
	) {}

	// This method is used to generate tokens for the user.
	private _generateTokens(payload: { id: string; role: string; username: string }): TokensEntity {
		return {
			// This property is used to define the access token for the user.
			accessToken: this.jwtService.sign(payload, { expiresIn: '5d', subject: 'access' }),
			// This property is used to define the refresh token for the user.
			refreshToken: this.jwtService.sign(payload, { expiresIn: '30d', subject: 'refresh' }),
		}
	}

	// This method is used to log in a user.
	// This method takes a username and password as parameters and returns a Promise of a LoginResponse.
	async login(username: string, password: string): Promise<LoginResponse> {
		// Fetch a user with the given username
		const user = await this.db.user.findUnique({ where: { username } })

		// If no user is found, throw an error
		if (!user) throw new NotFoundException(`No user found: ${username}`) // This method throws a NotFoundException if no user is found.

		// Check if the password is correct
		const isPasswordValid = await bcrypt.compare(password, user.password) // This method compares the password with the hashed password in the database.

		// If password does not match, throw an error
		if (!isPasswordValid) throw new UnauthorizedException('Invalid password')

		const tokens = this._generateTokens({
			// This method generates tokens for the user.
			id: user.id, // This property is used to define the ID of the user.
			username: user.username, // This property is used to define the username of the user.
			role: user.role, // This property is used to define the role of the user.
		})

		// Generate a JWT containing the user's ID and return it
		return {
			// This method returns a LoginResponse.
			username: user.username, // This property is used to define the username of the user.
			role: user.role, // This property is used to define the role of the user.
			id: user.id, // This property is used to define the ID of the user.
			tokens, // This property is used to define the tokens for the user.
		}
	}

	// Implement a method to refresh the JWT
	async refresh(refreshToken: string): Promise<TokensEntity> {
		// This method takes a refresh token as a parameter and returns a Promise of a TokensEntity.
		// Verify the refresh token
		const payload = this.jwtService.verify(refreshToken, { subject: 'refresh' }) // This method verifies the refresh token.
		// If the refresh token is invalid, throw an error
		if (!payload) throw new UnauthorizedException('Invalid refresh token') // This method throws an UnauthorizedException if the refresh token is invalid.

		const tokens = this._generateTokens({
			// This method generates tokens for the user.
			id: payload.id, // This property is used to define the ID of the user.
			username: payload.username, // This property is used to define the username of the user.
			role: payload.role, // This property is used to define the role of the user.
		})

		return tokens // This method returns the tokens for the user.
	}
}
