'use client'

import { useState } from 'react'
import { Search, Filter, Download, MoreVertical, Eye, FileText, CheckCircle, XCircle, Clock } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import Sidebar from '@/components/admin/sidebar'
import TopBar from '@/components/admin/top-bar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface Payment {
  id: string
  tenant: string
  property: string
  amount: string
  status: 'completed' | 'pending' | 'failed'
  dueDate: string
  paidDate: string | null
}

const INITIAL_PAYMENTS: Payment[] = [
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

export default function PaymentsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [payments, setPayments] = useState<Payment[]>(INITIAL_PAYMENTS)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'pending' | 'failed'>('all')

  // View Details State
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch = payment.tenant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.property.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || payment.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: Payment['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-700 dark:text-green-400'
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400'
      case 'failed':
        return 'bg-red-500/20 text-red-700 dark:text-red-400'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  const getStatusIcon = (status: Payment['status']) => {
    switch (status) {
      case 'completed': return <CheckCircle size={14} className="mr-1" />
      case 'pending': return <Clock size={14} className="mr-1" />
      case 'failed': return <XCircle size={14} className="mr-1" />
      default: return null
    }
  }

  const handleExport = () => {
    try {
      const csvContent = [
        ['ID', 'Tenant', 'Property', 'Amount', 'Status', 'Due Date', 'Paid Date'],
        ...filteredPayments.map(p => [p.id, p.tenant, p.property, p.amount, p.status, p.dueDate, p.paidDate || ''])
      ].map(e => e.join(",")).join("\n");

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", `rentify_payments_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success('Payments report exported successfully!')
    } catch (error) {
      toast.error('Failed to export report.')
    }
  }

  const handleDownloadInvoice = (payment: Payment) => {
    try {
      const invoiceContent = `
        RENTIFY PORTAL - INVOICE
        ------------------------
        Invoice ID: INV-${payment.id}-${Date.now()}
        Date: ${new Date().toLocaleDateString()}
        
        Tenant: ${payment.tenant}
        Property: ${payment.property}
        Amount: ${payment.amount}
        Status: ${payment.status.toUpperCase()}
        Due Date: ${payment.dueDate}
        Paid Date: ${payment.paidDate || 'N/A'}
        
        Thank you for your business!
      `;

      const blob = new Blob([invoiceContent], { type: 'text/plain;charset=utf-8;' });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", `invoice_${payment.tenant.replace(/\s+/g, '_')}_${payment.id}.txt`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success(`Invoice for ${payment.tenant} downloaded!`)
    } catch (error) {
      toast.error('Failed to download invoice.')
    }
  }

  const handleViewDetails = (payment: Payment) => {
    setSelectedPayment(payment)
    setIsDetailsOpen(true)
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 overflow-y-auto">
          <div className="p-6 lg:p-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 flex items-center justify-between"
            >
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2">Payments</h1>
                <p className="text-muted-foreground">Track and manage all rent payments</p>
              </div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={handleExport}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2"
                >
                  <Download size={18} />
                  Export Report
                </Button>
              </motion.div>
            </motion.div>

            {/* Search and Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-6 flex gap-4 flex-col sm:flex-row"
            >
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
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)}
                    className="pl-10 pr-4 py-2 bg-card border border-border rounded-lg text-foreground focus:ring-1 focus:ring-ring focus:outline-none appearance-none cursor-pointer"
                  >
                    <option value="all">All Statuses</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>
              </div>
            </motion.div>

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
                    <AnimatePresence mode='popLayout'>
                      {filteredPayments.length === 0 ? (
                        <motion.tr
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <td colSpan={7} className="px-6 py-8 text-center text-muted-foreground">
                            No payments found.
                          </td>
                        </motion.tr>
                      ) : (
                        filteredPayments.map((payment) => (
                          <motion.tr
                            key={payment.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            layout
                            className="border-b border-border hover:bg-secondary/50 transition-colors duration-200"
                          >
                            <td className="px-6 py-4 text-sm font-medium text-foreground">{payment.tenant}</td>
                            <td className="px-6 py-4 text-sm text-muted-foreground">{payment.property}</td>
                            <td className="px-6 py-4 text-sm font-medium text-foreground">{payment.amount}</td>
                            <td className="px-6 py-4 text-sm">
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                                {getStatusIcon(payment.status)}
                                {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-muted-foreground">{payment.dueDate}</td>
                            <td className="px-6 py-4 text-sm text-muted-foreground">{payment.paidDate || '-'}</td>
                            <td className="px-6 py-4 text-center">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="inline-flex items-center justify-center w-8 h-8 rounded-lg hover:bg-secondary transition-colors duration-200 outline-none"
                                  >
                                    <MoreVertical size={18} className="text-muted-foreground" />
                                  </motion.button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => handleViewDetails(payment)}>
                                    <Eye className="mr-2 h-4 w-4" />
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem onClick={() => handleDownloadInvoice(payment)}>
                                    <FileText className="mr-2 h-4 w-4" />
                                    Download Invoice
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </motion.tr>
                        ))
                      )}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>

        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Payment Details</DialogTitle>
              <DialogDescription>Transaction Information</DialogDescription>
            </DialogHeader>
            {selectedPayment && (
              <div className="grid gap-4 text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-semibold block">Tenant:</span>
                    <span>{selectedPayment.tenant}</span>
                  </div>
                  <div>
                    <span className="font-semibold block">Property:</span>
                    <span>{selectedPayment.property}</span>
                  </div>
                  <div>
                    <span className="font-semibold block">Amount:</span>
                    <span>{selectedPayment.amount}</span>
                  </div>
                  <div>
                    <span className="font-semibold block">Status:</span>
                    <span className={`uppercase font-bold ${selectedPayment.status === 'completed' ? 'text-green-600' : selectedPayment.status === 'failed' ? 'text-red-600' : 'text-yellow-600'}`}>{selectedPayment.status}</span>
                  </div>
                  <div>
                    <span className="font-semibold block">Due Date:</span>
                    <span>{selectedPayment.dueDate}</span>
                  </div>
                  <div>
                    <span className="font-semibold block">Paid Date:</span>
                    <span>{selectedPayment.paidDate || 'N/A'}</span>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
