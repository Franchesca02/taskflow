'use client'

import Board from '../components/Board'
import AddColumnForm from '../components/AddColumnForm'

export default function BoardPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">TaskFlow Board</h1>
          <AddColumnForm />
        </div>
        <Board />
      </div>
    </main>
  )
}