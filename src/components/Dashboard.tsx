import React from 'react';
import { useApp } from '../App';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { TrendingUp, Inbox, MessageSquare, Search, HandHeart, User, LogOut, Award } from 'lucide-react';

type DashboardProps = {
  onNavigate: (page: string) => void;
};

export function Dashboard({ onNavigate }: DashboardProps) {
  const { user, logout } = useApp();

  const pages = [
    {
      name: 'impact',
      title: 'Impact',
      icon: TrendingUp,
      description: 'Track your environmental and social impact',
      summary: 'See how many materials saved, money saved, and SDG goals achieved'
    },
    {
      name: 'receive',
      title: 'Receive',
      icon: Inbox,
      description: 'Browse available items to borrow',
      summary: 'View all lended/posted materials with damage levels and availability'
    },
    {
      name: 'post',
      title: 'Post',
      icon: MessageSquare,
      description: 'Share your experiences',
      summary: 'Post feedback and share how borrowed items helped you'
    },
    {
      name: 'request',
      title: 'Request',
      icon: Search,
      description: 'Request items you need',
      summary: 'Submit requests for items you need with quality and timeline'
    },
    {
      name: 'lend',
      title: 'Lend',
      icon: HandHeart,
      description: 'Lend items to the community',
      summary: 'Post items you want to lend with duration and quality details'
    },
    {
      name: 'profile',
      title: 'Profile',
      icon: User,
      description: 'View your activity',
      summary: 'All your posts, donations, lended and received items in one place'
    }
  ];

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Blue Grid Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full" style={{
          backgroundImage: 'linear-gradient(#2563eb 1px, transparent 1px), linear-gradient(90deg, #2563eb 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Header */}
      <div className="relative z-10 border-b-2 border-blue-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <HandHeart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-blue-600">ShareHub</h1>
              <p className="text-blue-500 text-sm">Community Sharing Platform</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-600" />
              <Badge className="bg-blue-600">{user?.medals || 0} Medals</Badge>
            </div>
            <div className="text-right mr-4">
              <p className="text-blue-600">Welcome, {user?.username}!</p>
              <p className="text-blue-500 text-sm">Pincode: {user?.pincode}</p>
            </div>
            <Button onClick={logout} variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-blue-600 mb-2">Dashboard</h2>
          <p className="text-blue-500">Explore our community sharing features</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pages.map((page) => {
            const Icon = page.icon;
            return (
              <Card
                key={page.name}
                className="border-2 border-blue-200 hover:border-blue-600 transition-all cursor-pointer hover:shadow-lg"
                onClick={() => onNavigate(page.name)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <CardTitle className="text-blue-600">{page.title}</CardTitle>
                  <CardDescription className="text-blue-500">{page.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-600 text-sm">{page.summary}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 text-center">
            <p className="text-blue-600">Items Lended</p>
            <p className="text-blue-600">12</p>
          </div>
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 text-center">
            <p className="text-blue-600">Items Received</p>
            <p className="text-blue-600">8</p>
          </div>
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 text-center">
            <p className="text-blue-600">Money Saved</p>
            <p className="text-blue-600">$450</p>
          </div>
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 text-center">
            <p className="text-blue-600">Community Members</p>
            <p className="text-blue-600">234</p>
          </div>
        </div>
      </div>
    </div>
  );
}
