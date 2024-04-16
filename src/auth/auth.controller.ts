import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { TokensEntity, LoginResponse } from './entity/auth.entity'
import { LoginDto } from './dto/login.dto'

@Controller('auth') // This decorator is used to define the path for the controller.
@ApiTags('auth') // This decorator is used to define the tags for the controller.
export class AuthController {
	// This is the controller class for the auth module.
	constructor(private readonly authService: AuthService) {} // This is the constructor for the AuthController class. It takes an instance of the AuthService as a parameter.

	/* ---------------------------- Login --------------------------- */
	@Post('login') // This decorator is used to define the HTTP request method and path for the login method.
	@ApiOkResponse({ type: LoginResponse }) // This decorator is used to define the response schema for the login method.
	login(@Body() { username, password }: LoginDto) {
		// This method takes a LoginDto object as a parameter and returns a Promise of a LoginResponse.
		return this.authService.login(username, password) // This method calls the login method of the AuthService and returns the result as a LoginResponse.
	}

	/* ---------------------------- Refresh --------------------------- */
	@Post('refresh') // This decorator is used to define the HTTP request method and path for the refresh method.
	@ApiOkResponse({ type: TokensEntity }) // This decorator is used to define the response schema for the refresh method.
	refresh(@Body('refreshToken') refreshToken: string) {
		// This method takes a refresh token as a parameter and returns a Promise of a TokensEntity.
		return this.authService.refresh(refreshToken) // This method calls the refresh method of the AuthService and returns the result as a TokensEntity.
	}
}
