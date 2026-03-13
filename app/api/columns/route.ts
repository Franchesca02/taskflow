import { NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';

export async function GET() {
  try {
    const columns = await prisma.column.findMany({
      include: {
        tasks: {
          orderBy: { order: 'asc' },
        },
      },
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(columns);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch columns' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { title } = await request.json();
    // get max order to append new column at the end
    const lastColumn = await prisma.column.findFirst({
      orderBy: { order: 'desc' },
    });
    const newOrder = (lastColumn?.order ?? -1) + 1;

    const column = await prisma.column.create({
      data: { title, order: newOrder },
    });
    return NextResponse.json(column, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create column' }, { status: 500 });
  }
}