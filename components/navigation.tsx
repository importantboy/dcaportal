"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, GraduationCap, Home, BookOpen, Users, Bell, Calendar, FileText, Library, Phone } from "lucide-react"

const navigationItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Courses", href: "/courses", icon: BookOpen },
  { name: "Faculty", href: "/faculty", icon: Users },
  { name: "Notice Board", href: "/notices", icon: Bell },
  { name: "Events", href: "/events", icon: Calendar },
  { name: "Assignments", href: "/assignments", icon: FileText },
  { name: "Library", href: "/library", icon: Library },
  { name: "Contact", href: "/contact", icon: Phone },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-blue-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
            <GraduationCap className="h-6 w-6 sm:h-8 sm:w-8 text-blue-200" />
            <div className="flex flex-col">
              <span className="font-bold text-sm sm:text-lg">DCA Portal</span>
              <span className="text-xs text-blue-200 hidden sm:block">SVIET</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-1 xl:space-x-2">
            {navigationItems.map((item) => {
              const IconComponent = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-1 xl:space-x-2 px-2 xl:px-3 py-2 rounded-md text-xs xl:text-sm font-medium hover:bg-blue-800 transition-colors duration-200"
                >
                  <IconComponent className="h-4 w-4" />
                  <span className="hidden xl:block">{item.name}</span>
                  <span className="xl:hidden">{item.name.split(" ")[0]}</span>
                </Link>
              )
            })}
          </div>

          {/* Tablet Navigation - Icons only */}
          <div className="hidden md:flex lg:hidden space-x-1">
            {navigationItems.map((item) => {
              const IconComponent = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center justify-center p-2 rounded-md hover:bg-blue-800 transition-colors duration-200 group relative"
                  title={item.name}
                >
                  <IconComponent className="h-5 w-5" />
                  {/* Tooltip for tablet */}
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                    {item.name}
                  </span>
                </Link>
              )
            })}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md hover:bg-blue-800 transition-colors duration-200 touch-manipulation"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}
        >
          <div className="pb-4 pt-2">
            <div className="flex flex-col space-y-1">
              {navigationItems.map((item) => {
                const IconComponent = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-3 px-4 py-3 rounded-md text-sm font-medium hover:bg-blue-800 transition-colors duration-200 touch-manipulation"
                    onClick={() => setIsOpen(false)}
                  >
                    <IconComponent className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
