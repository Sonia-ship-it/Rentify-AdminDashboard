'use client'

import { useState } from 'react'
import { Search, Plus, MoreVertical, MapPin, Edit2, Trash2, Home } from 'lucide-react'
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

interface Property {
  id: string
  name: string
  address: string
  landlord: string
  tenant: string | null
  rent: string
  status: 'occupied' | 'vacant'
  addedDate: string
}

const INITIAL_PROPERTIES: Property[] = [
  {
    id: '1',
    name: 'Skyline Apartments',
    address: '123 Main St, Mumbai',
    landlord: 'Sarah Johnson',
    tenant: 'John Doe',
    rent: '₹25,000',
    status: 'occupied',
    addedDate: '2024-01-15',
  },
  {
    id: '2',
    name: 'Green Valley Complex',
    address: '456 Oak Ave, Bangalore',
    landlord: 'Michael Brown',
    tenant: null,
    rent: '₹18,000',
    status: 'vacant',
    addedDate: '2024-02-10',
  },
  {
    id: '3',
    name: 'Riverside Residency',
    address: '789 River Rd, Delhi',
    landlord: 'Sarah Johnson',
    tenant: 'Emma Wilson',
    rent: '₹30,000',
    status: 'occupied',
    addedDate: '2024-03-05',
  },
  {
    id: '4',
    name: 'Downtown Lofts',
    address: '321 City Blvd, Hyderabad',
    landlord: 'Michael Brown',
    tenant: null,
    rent: '₹22,000',
    status: 'vacant',
    addedDate: '2024-03-20',
  },
]

export default function PropertiesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [properties, setProperties] = useState<Property[]>(INITIAL_PROPERTIES)
  const [searchTerm, setSearchTerm] = useState('')

  // Modal State
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProperty, setEditingProperty] = useState<Property | null>(null)
  const [formData, setFormData] = useState<Partial<Property>>({
    name: '',
    address: '',
    landlord: '',
    tenant: '', // Optional logic to be handled
    rent: '',
    status: 'vacant',
  })

  const filteredProperties = properties.filter((property) =>
    property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.landlord.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleOpenAdd = () => {
    setEditingProperty(null)
    setFormData({
      name: '',
      address: '',
      landlord: '',
      tenant: '',
      rent: '',
      status: 'vacant',
    })
    setIsDialogOpen(true)
  }

  const handleOpenEdit = (property: Property) => {
    setEditingProperty(property)
    setFormData({ ...property, tenant: property.tenant || '' })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    const propertyToDelete = properties.find(p => p.id === id)
    if (confirm(`Are you sure you want to delete ${propertyToDelete?.name}?`)) {
      setProperties(properties.filter(p => p.id !== id))
      toast.success('Property deleted successfully.')
    }
  }

  const handleSubmit = () => {
    if (!formData.name || !formData.address) {
      toast.error('Please fill in required fields.')
      return
    }

    const newPropertyData = {
      ...formData,
      tenant: formData.tenant || null
    } as Property

    if (editingProperty) {
      setProperties(properties.map(p => p.id === editingProperty.id ? { ...p, ...newPropertyData } : p))
      toast.success(`Property ${formData.name} updated.`)
    } else {
      const newProperty: Property = {
        ...newPropertyData,
        id: Math.random().toString(36).substr(2, 9),
        addedDate: new Date().toISOString().split('T')[0],
      }
      setProperties([newProperty, ...properties])
      toast.success(`Property ${formData.name} added!`)
    }
    setIsDialogOpen(false)
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
                <h1 className="text-4xl font-bold text-foreground mb-2">Properties</h1>
                <p className="text-muted-foreground">Manage all rental properties</p>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={handleOpenAdd}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2"
                    >
                      <Plus size={18} />
                      Add Property
                    </Button>
                  </motion.div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>{editingProperty ? 'Edit Property' : 'Add New Property'}</DialogTitle>
                    <DialogDescription>
                      {editingProperty ? 'Update property details.' : 'Enter details for the new property.'}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Property Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Sunset Apartments"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="123 Main St"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="rent">Rent Amount</Label>
                        <Input
                          id="rent"
                          value={formData.rent}
                          onChange={(e) => setFormData({ ...formData, rent: e.target.value })}
                          placeholder="e.g. ₹20,000"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="status">Status</Label>
                        <Select
                          value={formData.status}
                          onValueChange={(val: any) => setFormData({ ...formData, status: val })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="vacant">Vacant</SelectItem>
                            <SelectItem value="occupied">Occupied</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="landlord">Landlord</Label>
                        <Input
                          id="landlord"
                          value={formData.landlord}
                          onChange={(e) => setFormData({ ...formData, landlord: e.target.value })}
                          placeholder="Search Landlord..."
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="tenant">Tenant (Optional)</Label>
                        <Input
                          id="tenant"
                          value={formData.tenant || ''}
                          onChange={(e) => setFormData({ ...formData, tenant: e.target.value })}
                          placeholder="Search Tenant..."
                        />
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleSubmit}>{editingProperty ? 'Save Changes' : 'Add Property'}</Button>
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
                  placeholder="Search by name, address, or landlord..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-card border border-border rounded-lg focus:ring-1 focus:ring-ring"
                />
              </div>
            </motion.div>

            {/* Properties Table */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Property</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Address</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Landlord</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Tenant</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Rent</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence mode='popLayout'>
                      {filteredProperties.length === 0 ? (
                        <motion.tr
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <td colSpan={7} className="px-6 py-8 text-center text-muted-foreground">
                            No properties found.
                          </td>
                        </motion.tr>
                      ) : (
                        filteredProperties.map((property) => (
                          <motion.tr
                            key={property.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            layout
                            className="border-b border-border hover:bg-secondary/50 transition-colors duration-200"
                          >
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                  <Home size={18} />
                                </div>
                                <p className="text-sm font-medium text-foreground">{property.name}</p>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <MapPin size={16} />
                                {property.address}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-muted-foreground">{property.landlord}</td>
                            <td className="px-6 py-4 text-sm text-muted-foreground">{property.tenant || '-'}</td>
                            <td className="px-6 py-4 text-sm font-medium text-foreground">{property.rent}</td>
                            <td className="px-6 py-4 text-sm">
                              <span
                                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${property.status === 'occupied'
                                  ? 'bg-primary/20 text-primary'
                                  : 'bg-muted text-muted-foreground'
                                  }`}
                              >
                                {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                              </span>
                            </td>
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
                                  <DropdownMenuItem onClick={() => handleOpenEdit(property)}>
                                    <Edit2 className="mr-2 h-4 w-4" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    className="text-red-500 focus:text-red-500 focus:bg-red-50"
                                    onClick={() => handleDelete(property.id)}
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
