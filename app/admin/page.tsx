'use client'

import { useState } from 'react'
import { BarChart3, Users, Home, CreditCard, TrendingUp, Settings } from 'lucide-react'
import Sidebar from '@/components/admin/sidebar'
import TopBar from '@/components/admin/top-bar'
import DashboardCards from '@/components/admin/dashboard-cards'
import Charts from '@/components/admin/charts'
import RecentActivity from '@/components/admin/recent-activity'

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 lg:p-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back to the Rentify admin portal</p>
            </div>

            {/* Key Metrics */}
            <DashboardCards />

            {/* Charts Section */}
            <Charts />

            {/* Recent Activity */}
            <RecentActivity />
          </div>
        </main>
      </div>
    </div>
  )
}
