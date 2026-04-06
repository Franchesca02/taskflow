/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Better detection for build environments
const isBuildTime = () => {
  if (process.env.NEXT_PHASE === 'phase-production-build') return true
  if (process.env.NETLIFY && process.env.CONTEXT !== 'production') return true
  if (typeof window !== 'undefined') return false
  return false
}

// Create a dummy PrismaClient for build time that won't throw errors
const createDummyPrisma = () => {
  const dummy = {} as PrismaClient
  
  const dummyHandler = {
    get: (target: any, prop: string) => {
      if (prop === '$connect') return async () => {}
      if (prop === '$disconnect') return async () => {}
      if (prop === '$on') return () => {}
      if (prop === '$use') return () => {}
      if (prop === '$transaction') return async (fn: any) => fn({})
      if (prop === '$queryRaw') return async () => []
      if (prop === '$executeRaw') return async () => 0
      
      return {
        findMany: async () => [],
        findUnique: async () => null,
        findFirst: async () => null,
        create: async (data: any) => data?.data || {},
        update: async (data: any) => data?.data || {},
        upsert: async (data: any) => data?.create || data?.update || {},
        delete: async () => ({}),
        deleteMany: async () => ({ count: 0 }),
        updateMany: async () => ({ count: 0 }),
        count: async () => 0,
        aggregate: async () => ({}),
        groupBy: async () => [],
      }
    },
  }
  
  return new Proxy(dummy, dummyHandler) as PrismaClient
}

// Determine which Prisma instance to use
let prismaInstance: PrismaClient

if (isBuildTime()) {
  prismaInstance = createDummyPrisma()
  console.log('🔧 Using dummy PrismaClient for build time')
} else if (process.env.DATABASE_URL) {
  try {
    if (globalForPrisma.prisma) {
      prismaInstance = globalForPrisma.prisma
    } else {
      // Create SQLite adapter for Prisma 7
      const adapter = new PrismaLibSql({
        url: process.env.DATABASE_URL,
      })
      prismaInstance = new PrismaClient({ adapter })
      globalForPrisma.prisma = prismaInstance
    }
    console.log('✅ Connected to database')
  } catch (error) {
    console.error('Failed to create PrismaClient:', error)
    prismaInstance = createDummyPrisma()
  }
} else {
  console.warn('⚠️ No DATABASE_URL found, using dummy PrismaClient')
  prismaInstance = createDummyPrisma()
}

export const prisma = prismaInstance

if (process.env.NODE_ENV !== 'production' && !isBuildTime()) {
  globalForPrisma.prisma = prisma
}