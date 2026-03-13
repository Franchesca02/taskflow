'use client'

import { useState } from 'react'
import { useAddTask } from '../hooks/useTasks'

interface AddTaskFormProps {
  columnId: string
}

export default function AddTaskForm({ columnId }: AddTaskFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [content, setContent] = useState('')
  const [description, setDescription] = useState('')
  const addTask = useAddTask()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    await addTask.mutateAsync({
      content,
      description: description.trim() || undefined,
      columnId,
    })

    setContent('')
    setDescription('')
    setIsOpen(false)
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full text-left text-sm text-gray-500 hover:text-gray-700 py-2 px-3 rounded border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors"
      >
        + Add a task
      </button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mt-2 space-y-2">
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Task title..."
        className="w-full px-3 py-2 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        autoFocus
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description (optional)"
        rows={2}
        className="w-full px-3 py-2 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={addTask.isPending || !content.trim()}
          className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 disabled:opacity-50"
        >
          {addTask.isPending ? 'Adding...' : 'Add'}
        </button>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}