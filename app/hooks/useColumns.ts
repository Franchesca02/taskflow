import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { Column, CreateColumnInput } from '../lib/types'

// Helper functions to work with localStorage
const STORAGE_KEY = 'taskflow-columns'

const getColumnsFromStorage = (): Column[] => {
  if (typeof window === 'undefined') return []
  
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    return JSON.parse(stored)
  }
  
  // Initialize with default columns if empty
  const defaultColumns: Column[] = [
    {
      id: '1',
      title: 'To Do',
      order: 0,
      tasks: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '2',
      title: 'In Progress',
      order: 1,
      tasks: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '3',
      title: 'Done',
      order: 2,
      tasks: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultColumns))
  return defaultColumns
}

const saveColumnsToStorage = (columns: Column[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(columns))
}

export function useColumns() {
  return useQuery<Column[]>({
    queryKey: ['columns'],
    queryFn: async () => {
      // Simulate network delay for realism
      await new Promise(resolve => setTimeout(resolve, 300))
      return getColumnsFromStorage()
    },
  })
}

export function useAddColumn() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateColumnInput) => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300))
      
      const currentColumns = getColumnsFromStorage()
      
      // Create new column
      const newColumn: Column = {
        id: Date.now().toString(), // Simple ID generation
        title: data.title,
        order: currentColumns.length,
        tasks: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      
      const updatedColumns = [...currentColumns, newColumn]
      saveColumnsToStorage(updatedColumns)
      
      return newColumn
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['columns'] })
    },
  })
}

// Optional: Add a delete function
export function useDeleteColumn() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (columnId: string) => {
      await new Promise(resolve => setTimeout(resolve, 300))
      
      const currentColumns = getColumnsFromStorage()
      const updatedColumns = currentColumns.filter(col => col.id !== columnId)
      
      // Reorder remaining columns
      updatedColumns.forEach((col, index) => {
        col.order = index
      })
      
      saveColumnsToStorage(updatedColumns)
      return columnId
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['columns'] })
    },
  })
}