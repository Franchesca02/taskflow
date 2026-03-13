import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { Column, CreateColumnInput } from '../lib/types'

export function useColumns() {
  return useQuery<Column[]>({
    queryKey: ['columns'],
    queryFn: async () => {
      const res = await fetch('/api/columns')
      if (!res.ok) throw new Error('Failed to fetch columns')
      return res.json()
    },
  })
}

export function useAddColumn() {
  const queryClient = useQueryClient()

  return useMutation({
    // Change this to accept an object with title property
    mutationFn: async (data: CreateColumnInput) => {
      const res = await fetch('/api/columns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data), // This will send { title: "something" }
      })
      if (!res.ok) throw new Error('Failed to add column')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['columns'] })
    },
  })
}