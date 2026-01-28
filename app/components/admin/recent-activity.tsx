'use client'

import { CheckCircle, Clock, XCircle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Activity {
  id: string
  type: 'payment' | 'user' | 'property' | 'error'
  title: string
  description: string
  timestamp: string
}

export default function RecentActivity() {
  const activities: Activity[] = [
    {
      id: '1',
      type: 'payment',
      title: 'Payment Received',
      description: 'User John Doe completed rent payment for Property #234',
      timestamp: '2 hours ago',
    },
    {
      id: '2',
      type: 'user',
      title: 'New User Registration',
      description: 'Sarah Johnson registered as a new tenant',
      timestamp: '4 hours ago',
    },
    {
      id: '3',
      type: 'property',
      title: 'Property Listed',
      description: 'New property added by landlord Michael Brown',
      timestamp: '1 day ago',
    },
    {
      id: '4',
      type: 'error',
      title: 'Payment Failed',
      description: 'Payment processing failed for Property #567',
      timestamp: '2 days ago',
    },
  ]

  const getIcon = (type: Activity['type']) => {
    switch (type) {
      case 'payment':
        return <CheckCircle size={20} className="text-primary" />
      case 'user':
        return <Clock size={20} className="text-primary" />
      case 'property':
        return <CheckCircle size={20} className="text-primary" />
      case 'error':
        return <XCircle size={20} className="text-destructive" />
      default:
        return null
    }
  }

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>
        <Button variant="ghost" size="sm" className="text-primary hover:bg-secondary">
          View All <ArrowRight size={16} />
        </Button>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start gap-4 p-4 rounded-lg hover:bg-secondary/50 transition-colors duration-200"
          >
            {/* Icon */}
            <div className="mt-1">{getIcon(activity.type)}</div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">{activity.title}</p>
              <p className="text-sm text-muted-foreground truncate">{activity.description}</p>
            </div>

            {/* Timestamp */}
            <div className="text-xs text-muted-foreground whitespace-nowrap">{activity.timestamp}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
