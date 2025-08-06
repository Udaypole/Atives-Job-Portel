"use client"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Home, Briefcase, Compass, User, Bell, Search, Menu, X } from "lucide-react"
export function Navigation() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/jobs", label: "Jobs", icon: Briefcase },
    { href: "/explore", label: "Explore", icon: Compass },
    { href: "/profile", label: "Profile", icon: User },
  ]
  const isActive = (href: string) => pathname === href
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Atives</span>
          </Link>
          {}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    isActive(item.href)
                      ? "bg-purple-100 text-purple-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
          </div>
          {}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <Bell className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32&text=AR" />
                    <AvatarFallback>AR</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/onboarding">Onboarding</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        {}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive(item.href)
                        ? "bg-purple-100 text-purple-700"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                )
              })}
              <div className="border-t border-gray-200 pt-4 mt-4">
                <Link
                  href="/onboarding"
                  className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="h-5 w-5" />
                  <span className="font-medium">Onboarding</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}