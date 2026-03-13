/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from 'react'
import { useUIStore } from '../store/uistore'
import { useUpdateTask } from '../hooks/useTasks'

export default function EditTaskModal() {
  const { isEditModalOpen, editingTask, closeEditModal } = useUIStore()

  if (!isEditModalOpen || !editingTask) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      {/* Add key={editingTask.id} to force a new component instance */}
      <ModalContent 
        key={editingTask.id}
        editingTask={editingTask}
        closeEditModal={closeEditModal}
      />
    </div>
  )
}

// Separate component that gets a fresh state when key changes
function ModalContent({ 
  editingTask, 
  closeEditModal 
}: { 
  editingTask: any, 
  closeEditModal: () => void 
}) {
  const [content, setContent] = useState(editingTask.content)
  const [description, setDescription] = useState(editingTask.description || '')
  const updateTask = useUpdateTask()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    await updateTask.mutateAsync({
      id: editingTask.id,
      content,
      description: description.trim() || undefined,
    })

    closeEditModal()
  }

  return (
    <div className="bg-white rounded-lg max-w-md w-full p-6">
      <h2 className="text-xl font-semibold mb-4">Edit Task</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={closeEditModal}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={updateTask.isPending || !content.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {updateTask.isPending ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  )
}