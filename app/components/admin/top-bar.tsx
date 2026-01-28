'use client'

import { Menu, Search, Bell, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface TopBarProps {
  onMenuClick: () => void
}

export default function TopBar({ onMenuClick }: TopBarProps) {
  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 lg:px-8">
      {/* Left */}
      <button
        onClick={onMenuClick}
        className="lg:hidden text-foreground hover:text-muted-foreground transition-colors"
      >
        <Menu size={24} />
      </button>

      {/* Center - Search */}
      <div className="hidden md:flex flex-1 max-w-md mx-4">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            type="text"
            placeholder="Search users, properties..."
            className="pl-10 pr-4 py-2 bg-secondary border border-border rounded-lg focus:ring-1 focus:ring-ring"
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <button className="relative text-foreground hover:text-muted-foreground transition-colors">
          <Bell size={20} />
          <span className="absolute top-1 right-0 w-2 h-2 bg-destructive rounded-full"></span>
        </button>

        <button className="text-foreground hover:text-muted-foreground transition-colors">
          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
            <span className="text-xs font-semibold">A</span>
          </div>
        </button>

        <Button
          variant="ghost"
          size="sm"
          className="hidden sm:flex items-center gap-2 text-foreground hover:text-muted-foreground"
        >
          <LogOut size={18} />
          <span className="text-sm">Logout</span>
        </Button>
      </div>
    </header>
  )
}
