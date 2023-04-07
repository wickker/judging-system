import type { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'
import { DateTime } from 'luxon'

const useUserDto = (db: PrismaClient) => {
	const findByEmail = async (email: string) =>
		await db.user.findFirst({
			where: { email, deletedAt: null },
		})

	const updateClientTokenAndExpiry = async (id: number) =>
		await db.user.update({
			where: { id },
			data: {
				clientToken: uuidv4(),
				clientTokenExpiry: DateTime.local().plus({ days: 1 }).toJSDate(),
			},
		})

	const upsertByEmail = async (email: string) =>
		await db.user.upsert({
			where: { email },
			update: {
				clientToken: uuidv4(),
				clientTokenExpiry: DateTime.local().plus({ days: 1 }).toJSDate(),
			},
      create: {
        clientToken: uuidv4(),
				clientTokenExpiry: DateTime.local().plus({ days: 1 }).toJSDate(),
        email,
        hashedPassword: await bcrypt.hash("hello123", 11), // TODO: Change to random seed
      }
		})

    const create = async (email: string, password: string) => await db.user.create({
      data: {
        email,
        hashedPassword: await bcrypt.hash(password, 11),
        clientToken: uuidv4(),
        clientTokenExpiry: DateTime.local().plus({ days: 1 }).toJSDate(),
      },
    })

	return {
		findByEmail,
		updateClientTokenAndExpiry,
    upsertByEmail,
    create,
	}
}

export default useUserDto
