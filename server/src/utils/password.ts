import { compare, hash } from '@node-rs/bcrypt'

// TODO: 移动至 Auth 模块

export const passwordHash = async (password: string) => hash(password, 10)

export const passwordEquals = async (
  password: string,
  hashedPassword: string
) => compare(password, hashedPassword)
