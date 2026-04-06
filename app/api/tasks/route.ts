import { NextResponse } from 'next/server'
import { prisma } from '../../lib/prisma'

const isBuildTime = process.env.NEXT_PHASE === 'phase-production-build' || 
                    process.env.NETLIFY === 'true'

export async function POST(request: Request) {
  if (isBuildTime) {
    return NextResponse.json({ id: 'mock-id', content: 'Mock Task' })
  }
  
  try {
    const { content, description, columnId } = await request.json()

    if (!content || !columnId) {
      return NextResponse.json(
        { error: 'Content and columnId are required' },
        { status: 400 }
      )
    }

    const lastTask = await prisma.task?.findFirst({
      where: { columnId },
      orderBy: { order: 'desc' },
    })

    const newOrder = (lastTask?.order ?? -1) + 1

    const task = await prisma.task?.create({
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