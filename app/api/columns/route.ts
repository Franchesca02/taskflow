import { NextResponse } from 'next/server'
import { prisma } from '../../lib/prisma'

// Check if we're in build time
const isBuildTime = process.env.NEXT_PHASE === 'phase-production-build' || 
                    process.env.NETLIFY === 'true'

export async function GET() {
  // During build time, return empty data
  if (isBuildTime) {
    return NextResponse.json([])
  }
  
  try {
    const columns = await prisma.column?.findMany({
      include: {
        tasks: {
          orderBy: { order: 'asc' },
        },
      },
      orderBy: { order: 'asc' },
    }) || []
    
    return NextResponse.json(columns)
  } catch (error) {
    console.error('Error fetching columns:', error)
    return NextResponse.json([])
  }
}

export async function POST(request: Request) {
  // During build time, return mock response
  if (isBuildTime) {
    return NextResponse.json({ id: 'mock-id', title: 'Mock Column', order: 0 })
  }
  
  try {
    const body = await request.json()
    const { title } = body

    if (!title || typeof title !== 'string') {
      return NextResponse.json(
        { error: 'Title is required and must be a string' },
        { status: 400 }
      )
    }

    const lastColumn = await prisma.column?.findFirst({
      orderBy: { order: 'desc' },
    })

    const newOrder = (lastColumn?.order ?? -1) + 1

    const column = await prisma.column?.create({
      data: {
        title,
        order: newOrder,
      },
      include: {
        tasks: true,
      },
    })

    return NextResponse.json(column, { status: 201 })
  } catch (error) {
    console.error('Error creating column:', error)
    return NextResponse.json(
      { error: 'Failed to create column' },
      { status: 500 }
    )
  }
}