'use client'

import { useState } from 'react'
import { Search, Plus, MoreVertical, Edit2, Trash2, X, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import Sidebar from '@/components/admin/sidebar'
import TopBar from '@/components/admin/top-bar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface User {
  id: string
  name: string
  email: string
  phone: string
  role: 'tenant' | 'landlord'
  status: 'active' | 'inactive'
  joinedDate: string
}

const INITIAL_USERS: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+91 98765 43210',
    role: 'tenant',
    status: 'active',
    joinedDate: '2024-01-15',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '+91 87654 32109',
    role: 'landlord',
    status: 'active',
    joinedDate: '2024-02-20',
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael@example.com',
    phone: '+91 76543 21098',
    role: 'landlord',
    status: 'active',
    joinedDate: '2024-03-10',
  },
  {
    id: '4',
    name: 'Emma Wilson',
    email: 'emma@example.com',
    phone: '+91 65432 10987',
    role: 'tenant',
    status: 'inactive',
    joinedDate: '2024-01-25',
  },
]

export default function UsersPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [users, setUsers] = useState<User[]>(INITIAL_USERS)
  const [searchTerm, setSearchTerm] = useState('')

  // Modal State
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [formData, setFormData] = useState<Partial<User>>({
    name: '',
    email: '',
    phone: '',
    role: 'tenant',
    status: 'active',
  })

  // Filter Users
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.includes(searchTerm)
  )

  // Handlers
  const handleOpenAdd = () => {
    setEditingUser(null)
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: 'tenant',
      status: 'active',
    })
    setIsDialogOpen(true)
  }

  const handleOpenEdit = (user: User) => {
    setEditingUser(user)
    setFormData(user)
    setIsDialogOpen(true)
  }

  const handleSubmit = () => {
    if (!formData.name || !formData.email) {
      toast.error('Please fill in all required fields.')
      return
    }

    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...formData } as User : u))
      toast.success(`User ${formData.name} updated successfully!`)
    } else {
      const newUser: User = {
        ...formData as User,
        id: Math.random().toString(36).substr(2, 9),
        joinedDate: new Date().toISOString().split('T')[0],
      }
      setUsers([newUser, ...users])
      toast.success(`User ${formData.name} added successfully!`)
    }
    setIsDialogOpen(false)
  }

  const handleDelete = (id: string) => {
    const userToDelete = users.find(u => u.id === id)
    if (confirm(`Are you sure you want to delete ${userToDelete?.name}?`)) {
      setUsers(users.filter(u => u.id !== id))
      toast.success(`User deleted successfully.`)
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
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 flex items-center justify-between"
            >
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2">Users</h1>
                <p className="text-muted-foreground">Manage all tenants and landlords</p>
              </div>

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={handleOpenAdd}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2"
                    >
                      <Plus size={18} />
                      Add User
                    </Button>
                  </motion.div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editingUser ? 'Edit User' : 'Add New User'}</DialogTitle>
                    <DialogDescription>
                      {editingUser ? 'Update user details below.' : 'Fill in the details to add a new user to the system.'}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="role">Role</Label>
                        <Select
                          value={formData.role}
                          onValueChange={(val: any) => setFormData({ ...formData, role: val })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="tenant">Tenant</SelectItem>
                            <SelectItem value="landlord">Landlord</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="status">Status</Label>
                        <Select
                          value={formData.status}
                          onValueChange={(val: any) => setFormData({ ...formData, status: val })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleSubmit}>{editingUser ? 'Save Changes' : 'Add User'}</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </motion.div>

            {/* Search and Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-6"
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  type="text"
                  placeholder="Search by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-card border border-border rounded-lg focus:ring-1 focus:ring-ring"
                />
              </div>
            </motion.div>

            {/* Users Table */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Name</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Email</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Phone</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Role</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Joined</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence mode='popLayout'>
                      {filteredUsers.length === 0 ? (
                        <motion.tr
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <td colSpan={7} className="px-6 py-8 text-center text-muted-foreground">
                            No users found matching "{searchTerm}"
                          </td>
                        </motion.tr>
                      ) : (
                        filteredUsers.map((user) => (
                          <motion.tr
                            key={user.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            layout
                            className="border-b border-border hover:bg-secondary/50 transition-colors duration-200"
                          >
                            <td className="px-6 py-4 text-sm text-foreground font-medium">{user.name}</td>
                            <td className="px-6 py-4 text-sm text-muted-foreground">{user.email}</td>
                            <td className="px-6 py-4 text-sm text-muted-foreground">{user.phone}</td>
                            <td className="px-6 py-4 text-sm">
                              <span
                                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${user.role === 'tenant'
                                  ? 'bg-secondary text-foreground'
                                  : 'bg-muted text-foreground'
                                  }`}
                              >
                                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm">
                              <span
                                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${user.status === 'active'
                                  ? 'bg-primary/20 text-primary'
                                  : 'bg-muted text-muted-foreground'
                                  }`}
                              >
                                {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-muted-foreground">{user.joinedDate}</td>
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
                                  <DropdownMenuItem onClick={() => handleOpenEdit(user)}>
                                    <Edit2 className="mr-2 h-4 w-4" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    className="text-red-500 focus:text-red-500 focus:bg-red-50"
                                    onClick={() => handleDelete(user.id)}
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
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
      </div>
    </div>
  )
}
