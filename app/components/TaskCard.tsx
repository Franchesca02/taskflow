'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Task } from '../lib/types'
import { useUIStore } from '../store/uistore'
import { useDeleteTask } from '../hooks/useTasks'
import { useState } from 'react'

interface TaskCardProps {
  task: Task
}

export default function TaskCard({ task }: TaskCardProps) {
  const [showDelete, setShowDelete] = useState(false)
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: 'task',
      task,
    },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const openEditModal = useUIStore((state) => state.openEditModal)
  const deleteTask = useDeleteTask()

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (confirm('Are you sure you want to delete this task?')) {
      await deleteTask.mutateAsync(task.id)
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        bg-white p-3 rounded-lg shadow-sm border border-gray-200
        hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing
        relative group
      `}
      onMouseEnter={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
    >
      <div
        className="cursor-pointer"
        onClick={(e) => {
          e.stopPropagation()
          openEditModal(task)
        }}
      >
        <p className="text-sm font-medium text-gray-800 pr-6">{task.content}</p>
        {task.description && (
          <p className="text-xs text-gray-500 mt-1 line-clamp-2">
            {task.description}
          </p>
        )}
      </div>

      {showDelete && (
        <button
          onClick={handleDelete}
          className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
          aria-label="Delete task"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </div>
  )
}