import { PrismaClient } from '@prisma/client'
import { CustomLogger, LoggerType } from '../src/custom.logger'
import { randAvatar } from '@ngneat/falso'
import { hash } from '@node-rs/bcrypt'
import type { Prisma, Role, User } from '@prisma/client'

const prisma = new PrismaClient()

const SEED_LOGGER_CONTEXT = 'PrismaSeed'
const SEED_SUPER_ADMIN_USERNAME = 'SuperAdmin'
const SEED_SUPER_ADMIN_PASSWORD = '123456'

const main = async () => {
  CustomLogger.customLog('🦁 Seeding......', SEED_LOGGER_CONTEXT)

  const defaultUser: Prisma.UserCreateInput = {
    username: SEED_SUPER_ADMIN_USERNAME,
    password: await hash(SEED_SUPER_ADMIN_PASSWORD, 10),
    avatarUrl: randAvatar(),
    enabled: true
  }

  const superAdmin = await prisma.user.findUnique({
    where: {
      username: SEED_SUPER_ADMIN_USERNAME
    }
  })

  if (superAdmin) {
    CustomLogger.customLog(
      '🐻 SuperAdmin already exists!',
      SEED_LOGGER_CONTEXT,
      LoggerType.WARN
    )
    return
  }

  await prisma.user.create({
    data: {
      ...defaultUser
    }
  })

  CustomLogger.customLog(
    '🐻‍❄️ SuperAdmin has already been created: ',
    SEED_LOGGER_CONTEXT
  )
}

main()
  .then(() =>
    CustomLogger.customLog(
      '🐼 Seed your database successfully!',
      SEED_LOGGER_CONTEXT
    )
  )
  .catch((err) => {
    if (err instanceof Error) {
      CustomLogger.customLog(
        err.message,
        SEED_LOGGER_CONTEXT,
        LoggerType.ERROR,
        err.stack
      )
    }
  })
  .finally(async () => await prisma.$disconnect())
