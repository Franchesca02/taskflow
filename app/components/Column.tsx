'use client'

import { useDroppable } from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import type { Column as ColumnType } from '../lib/types'
import TaskCard from './TaskCard'
import AddTaskForm from '../components/AddTaskForm'

interface ColumnProps {
  column: ColumnType
  isActive?: boolean
}

export default function Column({ column, isActive }: ColumnProps) {
  const { setNodeRef } = useDroppable({
    id: column.id,
    data: {
      type: 'column',
      column,
    },
  })

  return (
    <div
      ref={setNodeRef}
      className={`
        flex-shrink-0 w-80 bg-gray-100 rounded-lg p-4
        ${isActive ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}
      `}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-gray-700">{column.title}</h2>
        <span className="text-sm text-gray-500 bg-white px-2 py-1 rounded">
          {column.tasks.length}
        </span>
      </div>

      <AddTaskForm columnId={column.id} />

      <SortableContext
        items={column.tasks.map((task) => task.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-2 mt-4">
          {column.tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </SortableContext>

      {column.tasks.length === 0 && (
        <div className="mt-4 text-center text-gray-400 text-sm py-4 border-2 border-dashed border-gray-300 rounded">
          Drop tasks here
        </div>
      )}
    </div>
  )
}