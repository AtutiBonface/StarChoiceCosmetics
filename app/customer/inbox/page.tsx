'use client'

import { useState } from 'react'
import { Mail, Bell, Trash2, Circle,  ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface Message {
  id: number
  type: 'message' | 'notification'
  title: string
  content: string
  date: string
  isRead: boolean
}

const messages: Message[] = [
  {
    id: 1,
    type: 'notification',
    title: 'Order Confirmed',
    content: 'Your order #12345 has been confirmed and is being processed.',
    date: '2024-03-09',
    isRead: false
  },
  {
    id: 2,
    type: 'message',
    title: 'Welcome to StarChoice',
    content: 'Thank you for creating an account with us. Enjoy shopping!',
    date: '2024-03-08',
    isRead: true
  }
  // Add more messages as needed
]

export default function InboxPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'messages' | 'notifications'>('all')
  const [selectedMessages, setSelectedMessages] = useState<number[]>([])

  const filteredMessages = messages.filter(message => {
    if (activeTab === 'messages') return message.type === 'message'
    if (activeTab === 'notifications') return message.type === 'notification'
    return true
  })

  const handleDelete = () => {
    // Add delete logic here
    console.log('Deleting messages:', selectedMessages)
  }

  return (
    <div className="w-full">
        <div className="w-full bg-secondary">
          <div className="max-w-7xl mx-auto px-4 py-2">
            <div className="flex items-center gap-2 text-sm text-secondary">
              <Link href="/" className="hover:text-accent-1">Home</Link>
              <ChevronRight size={16} />
              <span className="text-accent-1">My Inbox</span>
            </div>
          </div>
        </div>
        <div className="bg-primary shadow-sm rounded-[4px] px-4 py-2 w-full"></div>
        <div className="px-4 py-2 bg-primary shadow-sm rounded-[4px] w-full">
        {/* Header */}
        <div className="mb-2">
            <h1 className="text-2xl font-bold text-secondary">Inbox</h1>
            <p className="text-gray-600">Manage your messages and notifications</p>
        </div>

        {/* Tabs and Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex gap-2">
            <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 text-sm font-medium rounded-[4px] ${
                activeTab === 'all' 
                    ? 'bg-accent-1 text-white' 
                    : 'bg-secondary text-gray-600 hover:bg-gray-200'
                }`}
            >
                All
            </button>
            <button
                onClick={() => setActiveTab('messages')}
                className={`px-4 py-2 text-sm font-medium rounded-[4px] flex items-center gap-2 ${
                activeTab === 'messages' 
                    ? 'bg-accent-1 text-white' 
                    : 'bg-secondary text-gray-600 hover:bg-gray-200'
                }`}
            >
                <Mail size={16} />
                Messages
            </button>
            <button
                onClick={() => setActiveTab('notifications')}
                className={`px-4 py-2 text-sm font-medium rounded-[4px] flex items-center gap-2 ${
                activeTab === 'notifications' 
                    ? 'bg-accent-1 text-white' 
                    : 'bg-secondary text-gray-600 hover:bg-gray-200'
                }`}
            >
                <Bell size={16} />
                Notifications
            </button>
            </div>

            {selectedMessages.length > 0 && (
            <button
                onClick={handleDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-[4px] hover:bg-red-700 flex items-center gap-2"
            >
                <Trash2 size={16} />
                Delete Selected
            </button>
            )}
        </div>

        {/* Messages List */}
        <div className="space-y-4">
            {filteredMessages.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
                No messages found
            </div>
            ) : (
            filteredMessages.map((message) => (
                <div
                key={message.id}
                className={`p-4 border border-medium rounded-[4px] ${
                    message.isRead ? 'bg-primary' : 'bg-pink-50'
                }`}
                >
                <div className="flex items-start gap-4">
                    <input
                    type="checkbox"
                    checked={selectedMessages.includes(message.id)}
                    onChange={(e) => {
                        if (e.target.checked) {
                        setSelectedMessages([...selectedMessages, message.id])
                        } else {
                        setSelectedMessages(selectedMessages.filter(id => id !== message.id))
                        }
                    }}
                    className="mt-1"
                    />
                    <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        {!message.isRead && (
                        <Circle className="w-2 h-2 fill-pink-600 text-accent-1" />
                        )}
                        <h3 className="font-medium text-secondary">
                        {message.title}
                        </h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">
                        {message.content}
                    </p>
                    <span className="text-xs text-gray-500">
                        {new Date(message.date).toLocaleDateString()}
                    </span>
                    </div>
                </div>
                </div>
            ))
            )}
        </div>
        </div>
    </div>
  )
}