export default function Footer() {
  return (
    <footer className="bg-asphalt-900 text-gray-400 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🛣️</span>
            <span className="font-semibold text-white">Project Carry Out</span>
          </div>
          <p className="text-sm">
            Road Rehabilitation Management · Built with Next.js &amp; Cosmic
          </p>
        </div>
      </div>
    </footer>
  )
}