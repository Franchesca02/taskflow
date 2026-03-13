
import { Column as PrismaColumn, Task as PrismaTask } from '@prisma/client'

export type Task = PrismaTask

export type Column = PrismaColumn & {
  tasks: Task[]
}

export type CreateColumnInput = {
  title: string
}

export type CreateTaskInput = {
  content: string
  description?: string
  columnId: string
}

export type UpdateTaskInput = {
  content?: string
  description?: string
  columnId?: string
  order?: number
}