import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

const roundsOfHashing = 10 // the number of rounds of hashing

async function main() {
	const passwordSabin = await bcrypt.hash('password-zaid', roundsOfHashing) // hash the password

	const user1 = await prisma.user.upsert({
		where: { email: 'zaid@instorex.dk' },
		update: {
			password: passwordSabin,
		},
		create: {
			email: 'zaid@instorex.dk',
			name: 'Zaid Bari',
			password: passwordSabin,
			username: 'zaidbari',
			role: 'SUPERADMIN',
		},
	})
	console.log({ user1 })
}

main()
	.catch(e => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		// close Prisma Client at the end
		await prisma.$disconnect()
	})
