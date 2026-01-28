'use client'

import React from "react"

import { Users, Home, CreditCard, TrendingUp } from 'lucide-react'

interface Stat {
  label: string
  value: string | number
  change: string
  icon: React.ReactNode
}

export default function DashboardCards() {
  const stats: Stat[] = [
    {
      label: 'Total Users',
      value: '1,234',
      change: '+12% from last month',
      icon: <Users size={24} />,
    },
    {
      label: 'Active Properties',
      value: '456',
      change: '+8% from last month',
      icon: <Home size={24} />,
    },
    {
      label: 'Pending Payments',
      value: '₹45,230',
      change: '-5% from last month',
      icon: <CreditCard size={24} />,
    },
    {
      label: 'Revenue',
      value: '₹2,34,567',
      change: '+23% from last month',
      icon: <TrendingUp size={24} />,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/50"
        >
          {/* Icon */}
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center text-foreground/70">
              {stat.icon}
            </div>
          </div>

          {/* Content */}
          <h3 className="text-muted-foreground text-sm font-medium mb-2">{stat.label}</h3>
          <p className="text-3xl font-bold text-foreground mb-2">{stat.value}</p>
          <p className="text-xs text-primary font-medium">{stat.change}</p>
        </div>
      ))}
    </div>
  )
}
