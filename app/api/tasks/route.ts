import { NextResponse } from 'next/server'
import { prisma } from '../../lib/prisma'

export async function POST(request: Request) {
  try {
    const { content, description, columnId } = await request.json()

    if (!content || !columnId) {
      return NextResponse.json(
        { error: 'Content and columnId are required' },
        { status: 400 }
      )
    }

    // Get the highest order in the target column
    const lastTask = await prisma.task.findFirst({
      where: { columnId },
      orderBy: { order: 'desc' },
    })

    const newOrder = (lastTask?.order ?? -1) + 1

    const task = await prisma.task.create({
      data: {
        content,
        description,
        columnId,
        order: newOrder,
      },
    })

    return NextResponse.json(task, { status: 201 })
  } catch (error) {
    console.error('Error creating task:', error)
    return NextResponse.json(
      { error: 'Failed to create task' },
      { status: 500 }
    )
  }
}