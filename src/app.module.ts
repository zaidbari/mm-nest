import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from '@app/auth/auth.module'
import { UsersModule } from '@app/users/users.module'
import { DatabaseModule } from '@app/database/database.module'

@Module({
	// This property is used to define the modules that should be imported into the module.
	imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, UsersModule, DatabaseModule],
	controllers: [], // This property is used to define the controllers for the module.
	providers: [], // This property is used to define the providers for the module.
})
export class AppModule {}
