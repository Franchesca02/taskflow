'use client'

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable'
import { useColumns } from '../hooks/useColumns'
import { useReorderTask } from '../hooks/useTasks'
import Column from '../components/Column'
import { useState } from 'react'

export default function Board() {
  const { data: columns, isLoading } = useColumns()
  const reorderTask = useReorderTask()
  const [activeId, setActiveId] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    if (!over) return

    // Handle dragging over columns etc.
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)

    if (!over) return

    if (active.id !== over.id) {
      const activeTask = findTaskById(active.id as string)
      const overTask = findTaskById(over.id as string)

      if (!activeTask) return

      // If dropping over a column
      const overColumn = findColumnById(over.id as string)
      if (overColumn && activeTask.columnId !== overColumn.id) {
        // Move task to different column
        const tasksInTargetColumn = overColumn.tasks.length
        reorderTask.mutate({
          taskId: activeTask.id,
          newColumnId: overColumn.id,
          newOrder: tasksInTargetColumn,
        })
        return
      }

      // If reordering within same column
      if (overTask && activeTask.columnId === overTask.columnId) {
        const column = columns?.find((col) => col.id === activeTask.columnId)
        if (!column) return

        const oldIndex = column.tasks.findIndex((t) => t.id === active.id)
        const newIndex = column.tasks.findIndex((t) => t.id === over.id)

        if (oldIndex !== newIndex) {
          reorderTask.mutate({
            taskId: activeTask.id,
            newColumnId: activeTask.columnId,
            newOrder: newIndex,
          })
        }
      }
    }
  }

  const findTaskById = (id: string) => {
    for (const column of columns || []) {
      const task = column.tasks.find((t) => t.id === id)
      if (task) return task
    }
    return null
  }

  const findColumnById = (id: string) => {
    return columns?.find((col) => col.id === id)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading board...</div>
      </div>
    )
  }

  if (!columns?.length) {
    return (
      <div className="flex items-center justify-center h-64 border-2 border-dashed border-gray-300 rounded-lg">
        <div className="text-gray-500 text-center">
          <p className="mb-2">No columns yet</p>
          <p className="text-sm">Click &quot;Add Column&quot; to get started</p>
        </div>
      </div>
    )
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 overflow-x-auto pb-4 min-h-[600px]">
        {columns.map((column) => (
          <Column
            key={column.id}
            column={column}
            isActive={activeId ? column.tasks.some((t) => t.id === activeId) : false}
          />
        ))}
      </div>
    </DndContext>
  )
}