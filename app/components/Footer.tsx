import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Grid */}
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600" />
              <span className="font-semibold text-zinc-900 dark:text-white">TaskFlow</span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              The modern task management platform for high-performance teams.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-medium text-zinc-900 dark:text-white mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <li>
                <Link href="/coming-soon" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/coming-soon" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/coming-soon" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Changelog
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-medium text-zinc-900 dark:text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <li>
                <Link href="/coming-soon" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/coming-soon" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/coming-soon" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-medium text-zinc-900 dark:text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <li>
                <Link href="/coming-soon" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/coming-soon" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/coming-soon" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Security
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="border-t border-zinc-200 dark:border-zinc-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
            <p>
              © Ifeyinwa {currentYear} TaskFlow. Built with Next.js, TypeScript, and Prisma.
            </p>
            <div className="flex gap-6">
              <a 
                href="https://github.com/Franchesca02/taskflow" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                GitHub
              </a>
              <a 
                href="/coming-soon" 
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Twitter
              </a>
              <a 
                href="/coming-soon" 
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}