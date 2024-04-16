import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { RoleType } from '@prisma/client'

@Injectable()
export class RolesGuard implements CanActivate {
	// This class is used to define the roles guard for the application.
	constructor(private reflector: Reflector) {} // This constructor is used to inject the reflector service into the RolesGuard class.

	canActivate(context: ExecutionContext): boolean {
		// This method is used to check if the user has the required roles to access the route.
		const requiredRoles = this.reflector.getAllAndOverride<RoleType[]>('roles', [
			// This method gets the required roles from the metadata.
			context.getHandler(), // This method gets the handler from the context.
			context.getClass(), // This method gets the class from the context.
		])
		if (!requiredRoles) {
			return true // This method returns true if no roles are required.
		}
		const { user } = context.switchToHttp().getRequest() // This method gets the user from the request.
		return requiredRoles.some(role => user?.role === role || user?.role === RoleType.SUPERADMIN) // This method returns true if the user has one of the required roles.
	}
}
