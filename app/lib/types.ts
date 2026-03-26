export interface Task {
  id: string
  content: string
  description?: string
  columnId: string
  order: number
  createdAt: string
  updatedAt: string
}

export interface Column {
  id: string
  title: string
  order: number
  tasks: Task[]
  createdAt: string
  updatedAt: string
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