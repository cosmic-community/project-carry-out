import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-asphalt-900 text-white sticky top-0 z-40 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🛣️</span>
            <span className="font-bold text-lg tracking-tight">Project Carry Out</span>
          </Link>
          <nav className="flex items-center gap-1 sm:gap-4 text-sm font-medium">
            <Link href="/" className="px-3 py-2 rounded-md hover:bg-asphalt-800 transition-colors">
              Home
            </Link>
            <Link href="/projects" className="px-3 py-2 rounded-md hover:bg-asphalt-800 transition-colors">
              Projects
            </Link>
            <Link href="/milestones" className="px-3 py-2 rounded-md hover:bg-asphalt-800 transition-colors">
              Milestones
            </Link>
            <Link href="/defects" className="px-3 py-2 rounded-md hover:bg-asphalt-800 transition-colors">
              Defects
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}