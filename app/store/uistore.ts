import { create } from 'zustand'
import type { Task } from '../lib/types'

interface UIState {
  isEditModalOpen: boolean
  editingTask: Task | null
  openEditModal: (task: Task) => void
  closeEditModal: () => void
}

export const useUIStore = create<UIState>((set) => ({
  isEditModalOpen: false,
  editingTask: null,
  openEditModal: (task) => set({ isEditModalOpen: true, editingTask: task }),
  closeEditModal: () => set({ isEditModalOpen: false, editingTask: null }),
}))