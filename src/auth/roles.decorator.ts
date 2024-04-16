import { SetMetadata } from '@nestjs/common'
import { RoleType } from '@prisma/client'

// This is the HasRoles decorator. It takes a list of roles as parameters and sets the metadata for the roles.
export const HasRoles = (...roles: RoleType[]) => SetMetadata('roles', roles)
