'use client'

import { useState } from 'react'
import { Save } from 'lucide-react'
import Sidebar from '@/components/admin/sidebar'
import TopBar from '@/components/admin/top-bar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function SettingsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [settings, setSettings] = useState({
    siteName: 'Rentify',
    email: 'admin@rentify.com',
    phone: '+91 98765 43210',
    currency: 'INR',
    timezone: 'Asia/Kolkata',
    maintenanceMode: false,
  })

  const [saved, setSaved] = useState(false)

  const handleChange = (field: string, value: string | boolean) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 overflow-y-auto">
          <div className="p-6 lg:p-8 max-w-4xl">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-2">Settings</h1>
              <p className="text-muted-foreground">Configure your Rentify system</p>
            </div>

            {/* Success Message */}
            {saved && (
              <div className="mb-6 p-4 bg-primary/20 text-primary rounded-lg text-sm font-medium">
                Settings saved successfully!
              </div>
            )}

            {/* General Settings */}
            <div className="bg-card border border-border rounded-xl p-6 mb-6">
              <h2 className="text-xl font-semibold text-foreground mb-6">General Settings</h2>

              <div className="space-y-6">
                {/* Site Name */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Site Name</label>
                  <Input
                    type="text"
                    value={settings.siteName}
                    onChange={(e) => handleChange('siteName', e.target.value)}
                    className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:ring-1 focus:ring-ring"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Admin Email</label>
                  <Input
                    type="email"
                    value={settings.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:ring-1 focus:ring-ring"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Admin Phone</label>
                  <Input
                    type="tel"
                    value={settings.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:ring-1 focus:ring-ring"
                  />
                </div>
              </div>
            </div>

            {/* Regional Settings */}
            <div className="bg-card border border-border rounded-xl p-6 mb-6">
              <h2 className="text-xl font-semibold text-foreground mb-6">Regional Settings</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Currency */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Currency</label>
                  <select
                    value={settings.currency}
                    onChange={(e) => handleChange('currency', e.target.value)}
                    className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:ring-1 focus:ring-ring"
                  >
                    <option value="INR">Indian Rupee (₹)</option>
                    <option value="USD">US Dollar ($)</option>
                    <option value="EUR">Euro (€)</option>
                  </select>
                </div>

                {/* Timezone */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Timezone</label>
                  <select
                    value={settings.timezone}
                    onChange={(e) => handleChange('timezone', e.target.value)}
                    className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:ring-1 focus:ring-ring"
                  >
                    <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                    <option value="America/New_York">America/New_York (EST)</option>
                    <option value="Europe/London">Europe/London (GMT)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* System Settings */}
            <div className="bg-card border border-border rounded-xl p-6 mb-6">
              <h2 className="text-xl font-semibold text-foreground mb-6">System Settings</h2>

              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.maintenanceMode}
                    onChange={(e) => handleChange('maintenanceMode', e.target.checked)}
                    className="w-4 h-4 rounded border border-border"
                  />
                  <span className="text-sm font-medium text-foreground">Maintenance Mode</span>
                </label>
                <p className="text-xs text-muted-foreground mt-2">
                  Enable this to prevent users from accessing the system
                </p>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex gap-4">
              <Button
                onClick={handleSave}
                className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2"
              >
                <Save size={18} />
                Save Changes
              </Button>
              <Button
                variant="ghost"
                className="text-foreground hover:bg-secondary"
              >
                Cancel
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
