'use client'

import { Menu, Search, Bell, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface TopBarProps {
  onMenuClick: () => void
}

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { motion } from 'framer-motion'

interface TopBarProps {
  onMenuClick: () => void
}

const notifications = [
  { id: 1, title: 'New Tenant Joined', time: '5 mins ago', description: 'Alex Kumar added as a tenant.' },
  { id: 2, title: 'Payment Received', time: '1 hour ago', description: 'John Doe paid ₹25,000 for Skyline Apts.' },
  { id: 3, title: 'Maintenance Request', time: '3 hours ago', description: 'Faucet leak reported in Riverside Residency.' },
  { id: 4, title: 'Property Occupied', time: '1 day ago', description: 'Skyline Apartments is now fully occupied.' },
]

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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative p-2 text-foreground hover:bg-secondary rounded-lg transition-colors outline-none"
            >
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full border-2 border-card"></span>
            </motion.button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 p-0">
            <DropdownMenuLabel className="p-4 border-b border-border">Notifications</DropdownMenuLabel>
            <div className="max-h-96 overflow-y-auto">
              {notifications.map((n) => (
                <DropdownMenuItem key={n.id} className="p-4 flex flex-col items-start gap-1 cursor-pointer hover:bg-secondary focus:bg-secondary transition-colors border-b border-border/50 last:border-0">
                  <div className="flex justify-between w-full">
                    <span className="font-semibold text-sm">{n.title}</span>
                    <span className="text-[10px] text-muted-foreground">{n.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">{n.description}</p>
                </DropdownMenuItem>
              ))}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="p-3 text-center text-xs text-primary font-medium flex justify-center hover:bg-secondary cursor-pointer">
              View All Notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

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
