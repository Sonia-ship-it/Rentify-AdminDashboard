'use client'

import { useState } from 'react'
import { Search, Plus, MoreVertical, MapPin } from 'lucide-react'
import Sidebar from '@/components/admin/sidebar'
import TopBar from '@/components/admin/top-bar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

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

export default function PropertiesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  const properties: Property[] = [
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
                <h1 className="text-4xl font-bold text-foreground mb-2">Properties</h1>
                <p className="text-muted-foreground">Manage all rental properties</p>
              </div>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2">
                <Plus size={18} />
                Add Property
              </Button>
            </div>

            {/* Search and Filter */}
            <div className="mb-6">
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
            </div>

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
                    {properties.map((property) => (
                      <tr
                        key={property.id}
                        className="border-b border-border hover:bg-secondary/50 transition-colors duration-200"
                      >
                        <td className="px-6 py-4">
                          <div>
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
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              property.status === 'occupied'
                                ? 'bg-primary/20 text-primary'
                                : 'bg-muted text-muted-foreground'
                            }`}
                          >
                            {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                          </span>
                        </td>
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
