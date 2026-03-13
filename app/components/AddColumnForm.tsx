'use client'

import { useState } from 'react'
import { useAddColumn } from '../hooks/useColumns'

export default function AddColumnForm() {
  const [title, setTitle] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const addColumn = useAddColumn()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    await addColumn.mutateAsync({ title })
    setTitle('')
    setIsOpen(false)
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        + Add Column
      </button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Column title..."
        className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        autoFocus
      />
      <button
        type="submit"
        disabled={addColumn.isPending}
        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
      >
        {addColumn.isPending ? 'Adding...' : 'Add'}
      </button>
      <button
        type="button"
        onClick={() => setIsOpen(false)}
        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
      >
        Cancel
      </button>
    </form>
  )
}