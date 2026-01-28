'use client'

import { useState, useEffect } from 'react'
import { Save, Moon, Sun, Monitor } from 'lucide-react'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import Sidebar from '@/components/admin/sidebar'
import TopBar from '@/components/admin/top-bar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function SettingsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  const [settings, setSettings] = useState({
    siteName: 'Rentify',
    email: 'admin@rentify.com',
    phone: '+91 98765 43210',
    currency: 'INR',
    timezone: 'Asia/Kolkata',
    maintenanceMode: false,
    notifications: true,
  })

  const [saved, setSaved] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleChange = (field: string, value: string | boolean) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = () => {
    setSaved(true)
    toast.success('System settings updated successfully!', {
      description: 'Your preferences have been saved to the local session.',
    })
    setTimeout(() => setSaved(false), 3000)
  }

  if (!mounted) return null

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 overflow-y-auto">
          <div className="p-6 lg:p-8 max-w-4xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-4xl font-bold text-foreground mb-2">Settings</h1>
              <p className="text-muted-foreground">Configure your Rentify system</p>
            </motion.div>

            {/* Success Message UI (Legacy) - Keeping it as a backup UI indicator */}
            <AnimatePresence>
              {saved && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 p-4 bg-primary/20 text-primary rounded-lg text-sm font-medium flex items-center gap-2"
                >
                  <Save size={16} />
                  Settings saved successfully!
                </motion.div>
              )}
            </AnimatePresence>

            {/* Appearance Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>Customize how Rentify looks on your device.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="theme" className="flex flex-col gap-1">
                      <span>Theme Preference</span>
                      <span className="font-normal text-muted-foreground">Select between light, dark, or system theme.</span>
                    </Label>
                    <div className="flex gap-2 bg-secondary p-1 rounded-lg font-sans">
                      <Button
                        variant={theme === 'light' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setTheme('light')}
                        className="gap-2"
                      >
                        <Sun size={16} /> Light
                      </Button>
                      <Button
                        variant={theme === 'dark' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setTheme('dark')}
                        className="gap-2"
                      >
                        <Moon size={16} /> Dark
                      </Button>
                      <Button
                        variant={theme === 'system' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setTheme('system')}
                        className="gap-2"
                      >
                        <Monitor size={16} /> System
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* General Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle>General Information</CardTitle>
                  <CardDescription>Basic details about your organization.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="siteName">Site Name</Label>
                    <Input
                      id="siteName"
                      value={settings.siteName}
                      onChange={(e) => handleChange('siteName', e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Admin Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={settings.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Admin Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={settings.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Regional Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Regional Preferences</CardTitle>
                  <CardDescription>Set your local currency and timezone.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select value={settings.currency} onValueChange={(val) => handleChange('currency', val)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="INR">Indian Rupee (₹)</SelectItem>
                        <SelectItem value="USD">US Dollar ($)</SelectItem>
                        <SelectItem value="EUR">Euro (€)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select value={settings.timezone} onValueChange={(val) => handleChange('timezone', val)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Asia/Kolkata">Asia/Kolkata (IST)</SelectItem>
                        <SelectItem value="America/New_York">America/New_York (EST)</SelectItem>
                        <SelectItem value="Europe/London">Europe/London (GMT)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* System Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle>System Controls</CardTitle>
                  <CardDescription>Manage system availability and notifications.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-0.5">
                      <Label className="text-base">Maintenance Mode</Label>
                      <p className="text-sm text-muted-foreground">Prevent users from accessing the system.</p>
                    </div>
                    <Switch
                      checked={settings.maintenanceMode}
                      onCheckedChange={(checked: boolean) => handleChange('maintenanceMode', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-0.5">
                      <Label className="text-base">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive updates about system activity.</p>
                    </div>
                    <Switch
                      checked={settings.notifications}
                      onCheckedChange={(checked: boolean) => handleChange('notifications', checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Save Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex gap-4 justify-end mb-12"
            >
              <Button
                variant="ghost"
                className="text-foreground hover:bg-secondary"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2"
              >
                <Save size={18} />
                Save Changes
              </Button>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}
