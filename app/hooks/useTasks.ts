/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { Task, CreateTaskInput, UpdateTaskInput } from '../lib/types'

export function useAddTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateTaskInput) => {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed to add task')
      return res.json()
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
      const res = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed to update task')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['columns'] })
    },
  })
}

export function useDeleteTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error('Failed to delete task')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['columns'] })
    },
  })
}

// Special hook for drag-and-drop reordering
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
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          columnId: newColumnId,
          order: newOrder,
        }),
      })
      if (!res.ok) throw new Error('Failed to reorder task')
      return res.json()
    },
    onMutate: async ({ taskId, newColumnId, newOrder }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['columns'] })

      // Snapshot previous value
      const previousColumns = queryClient.getQueryData(['columns'])

      // Optimistically update
      queryClient.setQueryData(['columns'], (old: any) => {
        if (!old) return old

        return old.map((column: any) => ({
          ...column,
          tasks: column.tasks.map((task: any) => {
            if (task.id === taskId) {
              return { ...task, columnId: newColumnId, order: newOrder }
            }
            return task
          }),
        }))
      })

      return { previousColumns }
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(['columns'], context?.previousColumns)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['columns'] })
    },
  })
}