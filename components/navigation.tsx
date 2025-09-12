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
    <nav className="navigation-bar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <Link href="/" className="navigation-logo">
            <GraduationCap className="h-6 w-6 sm:h-8 sm:w-8 text-blue-200" />
            <div className="flex flex-col">
              <span className="font-bold text-sm sm:text-lg navigation-text">DCA Portal</span>
              <span className="text-xs text-blue-200 hidden sm:block">SVIET</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-1 xl:space-x-2">
            {navigationItems.map((item) => {
              const IconComponent = item.icon
              return (
                <Link key={item.name} href={item.href} className="navigation-link">
                  <IconComponent className="h-4 w-4 navigation-icon" />
                  <span className="hidden xl:block navigation-text">{item.name}</span>
                  <span className="xl:hidden navigation-text">{item.name.split(" ")[0]}</span>
                </Link>
              )
            })}
          </div>

          {/* Tablet Navigation - Icons only */}
          <div className="hidden md:flex lg:hidden space-x-1">
            {navigationItems.map((item) => {
              const IconComponent = item.icon
              return (
                <Link key={item.name} href={item.href} className="navigation-icon-link" title={item.name}>
                  <IconComponent className="h-5 w-5 navigation-icon" />
                  {/* Tooltip for tablet */}
                  <span className="navigation-tooltip">{item.name}</span>
                </Link>
              )
            })}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="navigation-menu-button"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="h-6 w-6 navigation-icon" /> : <Menu className="h-6 w-6 navigation-icon" />}
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
                    className="navigation-mobile-link"
                    onClick={() => setIsOpen(false)}
                  >
                    <IconComponent className="h-5 w-5 navigation-icon" />
                    <span className="navigation-text">{item.name}</span>
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
