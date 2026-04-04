'use client'

import Board from '../components/Board'
import AddColumnForm from '../components/AddColumnForm'
import Link from 'next/link'
import { ArrowLeft, Home } from 'lucide-react'

export default function BoardPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-8">
          {/* Back Button */}
          <div className="w-[120px] flex-shrink-0">
            {/* <Link 
              href="/" 
              className="group inline-flex items-center gap-2 px-4 py-2.5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 dark:border-gray-700/50 hover:border-blue-500/50 overflow-hidden whitespace-nowrap"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform flex-shrink-0" />
              <Home className="w-4 h-4 flex-shrink-0" />
              <span className="font-medium">Home</span>
            </Link> */}
          </div>

          {/* Title */}
          <h1 className="flex-1 text-center text-2xl sm:text-3xl font-bold px-2">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent break-words">
              TaskFlow Board
            </span>
          </h1>

          {/* Add Column Button */}
          <div className="w-[120px] flex-shrink-0 flex justify-end">
            <AddColumnForm />
          </div>
        </div>
        
        {/* Board */}
        <div className="overflow-x-auto pb-4 -mx-4 sm:mx-0">
          <div className="min-w-max px-4 sm:px-0">
            <Board />
          </div>
        </div>
      </div>
    </main>
  )
}