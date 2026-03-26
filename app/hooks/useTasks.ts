/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { Task, CreateTaskInput, UpdateTaskInput } from '../lib/types'

// Helper functions for localStorage
const STORAGE_KEY = 'taskflow-columns'

const getColumnsFromStorage = () => {
  if (typeof window === 'undefined') return []
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : []
}

const saveColumnsToStorage = (columns: any[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(columns))
}

export function useAddTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateTaskInput) => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300))
      
      const columns = getColumnsFromStorage()
      
      // Find the target column
      const columnIndex = columns.findIndex((col: any) => col.id === data.columnId)
      if (columnIndex === -1) throw new Error('Column not found')
      
      // Create new task
      const newTask: Task = {
        id: Date.now().toString(),
        content: data.content,
        description: data.description || '',
        columnId: data.columnId,
        order: columns[columnIndex].tasks.length,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      
      // Add task to column
      columns[columnIndex].tasks.push(newTask)
      saveColumnsToStorage(columns)
      
      return newTask
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['columns'] })
    },
  })
}

export function useUpdateTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, ...data }: UpdateTaskInput & { id: string }) => {
      await new Promise(resolve => setTimeout(resolve, 300))
      
      const columns = getColumnsFromStorage()
      
      // Find the task across all columns
      for (const column of columns) {
        const taskIndex = column.tasks.findIndex((t: Task) => t.id === id)
        if (taskIndex !== -1) {
          // Update task
          column.tasks[taskIndex] = {
            ...column.tasks[taskIndex],
            ...data,
            updatedAt: new Date().toISOString()
          }
          saveColumnsToStorage(columns)
          return column.tasks[taskIndex]
        }
      }
      
      throw new Error('Task not found')
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['columns'] })
    },
  })
}

export function useDeleteTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (taskId: string) => {
      await new Promise(resolve => setTimeout(resolve, 300))
      
      const columns = getColumnsFromStorage()
      
      // Find and remove task
      for (const column of columns) {
        const taskIndex = column.tasks.findIndex((t: Task) => t.id === taskId)
        if (taskIndex !== -1) {
          column.tasks.splice(taskIndex, 1)
          // Reorder remaining tasks
          column.tasks.forEach((task: Task, index: number) => {
            task.order = index
          })
          saveColumnsToStorage(columns)
          return taskId
        }
      }
      
      throw new Error('Task not found')
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['columns'] })
    },
  })
}

export function useReorderTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      taskId,
      newColumnId,
      newOrder,
    }: {
      taskId: string
      newColumnId: string
      newOrder: number
    }) => {
      await new Promise(resolve => setTimeout(resolve, 300))
      
      const columns = getColumnsFromStorage()
      let taskToMove: Task | null = null
      let sourceColumnIndex = -1
      
      // Find the task and remove it from source column
      for (let i = 0; i < columns.length; i++) {
        const taskIndex = columns[i].tasks.findIndex((t: Task) => t.id === taskId)
        if (taskIndex !== -1) {
          taskToMove = columns[i].tasks[taskIndex]
          sourceColumnIndex = i
          columns[i].tasks.splice(taskIndex, 1)
          break
        }
      }
      
      if (!taskToMove) throw new Error('Task not found')
      
      // Find target column
      const targetColumnIndex = columns.findIndex((col: any) => col.id === newColumnId)
      if (targetColumnIndex === -1) throw new Error('Target column not found')
      
      // Update task properties
      taskToMove.columnId = newColumnId
      taskToMove.order = newOrder
      taskToMove.updatedAt = new Date().toISOString()
      
      // Insert task at new position
      columns[targetColumnIndex].tasks.splice(newOrder, 0, taskToMove)
      
      // Reorder tasks in both source and target columns
      if (sourceColumnIndex !== -1) {
        columns[sourceColumnIndex].tasks.forEach((task: Task, index: number) => {
          task.order = index
        })
      }
      
      columns[targetColumnIndex].tasks.forEach((task: Task, index: number) => {
        task.order = index
      })
      
      saveColumnsToStorage(columns)
      return taskToMove
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['columns'] })
    },
  })
}