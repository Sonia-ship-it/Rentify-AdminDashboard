'use client'

import { useState } from 'react'
import { Search, Filter, Download, MoreVertical } from 'lucide-react'
import Sidebar from '@/components/admin/sidebar'
import TopBar from '@/components/admin/top-bar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface Payment {
  id: string
  tenant: string
  property: string
  amount: string
  status: 'completed' | 'pending' | 'failed'
  dueDate: string
  paidDate: string | null
}

export default function PaymentsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'pending' | 'failed'>('all')

  const payments: Payment[] = [
    {
      id: '1',
      tenant: 'John Doe',
      property: 'Skyline Apartments',
      amount: '₹25,000',
      status: 'completed',
      dueDate: '2024-04-05',
      paidDate: '2024-04-03',
    },
    {
      id: '2',
      tenant: 'Emma Wilson',
      property: 'Riverside Residency',
      amount: '₹30,000',
      status: 'pending',
      dueDate: '2024-04-10',
      paidDate: null,
    },
    {
      id: '3',
      tenant: 'John Doe',
      property: 'Skyline Apartments',
      amount: '₹25,000',
      status: 'failed',
      dueDate: '2024-03-05',
      paidDate: null,
    },
    {
      id: '4',
      tenant: 'Alex Kumar',
      property: 'Green Valley Complex',
      amount: '₹18,000',
      status: 'completed',
      dueDate: '2024-04-01',
      paidDate: '2024-04-01',
    },
  ]

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch = payment.tenant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.property.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || payment.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: Payment['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-primary/20 text-primary'
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-600'
      case 'failed':
        return 'bg-destructive/20 text-destructive'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 overflow-y-auto">
          <div className="p-6 lg:p-8">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2">Payments</h1>
                <p className="text-muted-foreground">Track and manage all rent payments</p>
              </div>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2">
                <Download size={18} />
                Export Report
              </Button>
            </div>

            {/* Search and Filter */}
            <div className="mb-6 flex gap-4 flex-col sm:flex-row">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  type="text"
                  placeholder="Search by tenant or property..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-card border border-border rounded-lg focus:ring-1 focus:ring-ring"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)}
                  className="px-4 py-2 bg-card border border-border rounded-lg text-foreground focus:ring-1 focus:ring-ring"
                >
                  <option value="all">All Statuses</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
            </div>

            {/* Payments Table */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Tenant</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Property</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Amount</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Due Date</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Paid Date</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPayments.map((payment) => (
                      <tr
                        key={payment.id}
                        className="border-b border-border hover:bg-secondary/50 transition-colors duration-200"
                      >
                        <td className="px-6 py-4 text-sm font-medium text-foreground">{payment.tenant}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{payment.property}</td>
                        <td className="px-6 py-4 text-sm font-medium text-foreground">{payment.amount}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                            {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{payment.dueDate}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{payment.paidDate || '-'}</td>
                        <td className="px-6 py-4 text-center">
                          <button className="inline-flex items-center justify-center w-8 h-8 rounded-lg hover:bg-secondary transition-colors duration-200">
                            <MoreVertical size={18} className="text-muted-foreground" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
