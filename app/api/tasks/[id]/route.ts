import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

type Params = {
  params: {
    id: string
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const { id } = params
    const { content, description, columnId, order } = await request.json()

    const existingTask = await prisma.task.findUnique({
      where: { id },
    })

    if (!existingTask) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      )
    }

    // If moving to a different column or reordering
    if (columnId && columnId !== existingTask.columnId) {
      // Make room in the new column
      await prisma.task.updateMany({
        where: {
          columnId,
          order: { gte: order ?? 0 },
        },
        data: {
          order: { increment: 1 },
        },
      })
    }

    const task = await prisma.task.update({
      where: { id },
      data: {
        content: content ?? existingTask.content,
        description: description ?? existingTask.description,
        columnId: columnId ?? existingTask.columnId,
        order: order ?? existingTask.order,
      },
    })

    return NextResponse.json(task)
  } catch (error) {
    console.error('Error updating task:', error)
    return NextResponse.json(
      { error: 'Failed to update task' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const { id } = params

    await prisma.task.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting task:', error)
    return NextResponse.json(
      { error: 'Failed to delete task' },
      { status: 500 }
    )
  }
}