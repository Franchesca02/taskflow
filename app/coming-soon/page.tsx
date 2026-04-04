'use client'

import { Clock, Sparkles, Rocket, Mail, Github, Twitter, Linkedin } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function ComingSoonPage() {
  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    // Set launch date to 30 days from now
    const launchDate = new Date()
    launchDate.setDate(launchDate.getDate() + 30)
    
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = launchDate.getTime() - now
      
      setDays(Math.floor(distance / (1000 * 60 * 60 * 24)))
      setHours(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))
      setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)))
      setSeconds(Math.floor((distance % (1000 * 60)) / 1000))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Animated Background Pattern - Behind everything */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] opacity-30"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Content - Positioned above background */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center mb-16">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800 mb-8">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">In Development</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Coming Soon
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            We&apos;re working hard to bring you something amazing. Stay tuned for updates and be the first to experience the future of task management.
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="max-w-3xl mx-auto mb-20">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl border border-zinc-200 dark:border-zinc-700">
            <div className="text-center mb-8">
              <Clock className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
              <h2 className="text-xl sm:text-2xl font-semibold text-zinc-900 dark:text-white">Launching In</h2>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {[
                { value: days, label: 'Days', color: 'from-blue-600 to-blue-400' },
                { value: hours, label: 'Hours', color: 'from-purple-600 to-purple-400' },
                { value: minutes, label: 'Minutes', color: 'from-pink-600 to-pink-400' },
                { value: seconds, label: 'Seconds', color: 'from-indigo-600 to-indigo-400' },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <div className={`bg-gradient-to-br ${item.color} rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-lg`}>
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                      {String(item.value).padStart(2, '0')}
                    </div>
                  </div>
                  <div className="mt-2 sm:mt-3 text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-400">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Preview */}
        <div className="mb-20">
          <h2 className="text-2xl lg:text-3xl font-bold text-center text-zinc-900 dark:text-white mb-12">
            What&apos;s Coming
          </h2>
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: Rocket,
                title: 'AI-Powered Insights',
                description: 'Smart task suggestions and automated workflow optimization.',
                gradient: 'from-blue-600 to-purple-600'
              },
              {
                icon: Sparkles,
                title: 'Team Collaboration',
                description: 'Real-time collaboration, comments, and team chat features.',
                gradient: 'from-purple-600 to-pink-600'
              },
              {
                icon: Mail,
                title: 'Email Integration',
                description: 'Turn emails into tasks and get notifications directly in your inbox.',
                gradient: 'from-pink-600 to-orange-600'
              }
            ].map((feature, idx) => (
              <div 
                key={idx}
                className="group relative p-6 sm:p-8 bg-white dark:bg-gray-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 hover:shadow-xl transition-all duration-300"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity`} />
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4 sm:mb-6`}>
                  <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-zinc-900 dark:text-white mb-2 sm:mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="max-w-3xl mx-auto mb-20">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-white">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3">Be the First to Know</h2>
              <p className="text-sm sm:text-base text-blue-100">Get early access and exclusive updates straight to your inbox.</p>
            </div>
            
            <form className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 sm:px-6 py-3 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-white text-sm sm:text-base"
              />
              <button
                type="submit"
                className="px-6 sm:px-8 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors shadow-lg text-sm sm:text-base"
              >
                Notify Me
              </button>
            </form>
            <p className="text-center text-blue-100 text-xs sm:text-sm mt-4">
              No spam, unsubscribe anytime.
            </p>
          </div>
        </div>

        {/* Social Links */}
        <div className="text-center">
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">Follow our journey</p>
          <div className="flex justify-center gap-4 sm:gap-6">
            {[
              { icon: Github, href: "https://github.com/Franchesca02/taskflow", label: "GitHub" },
              { icon: Twitter, href: "#", label: "Twitter" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/ihuoma-ifeyinwa-bb8a51170", label: "LinkedIn" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 sm:p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 border border-zinc-200 dark:border-zinc-700"
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-700 dark:text-zinc-300" />
              </a>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}