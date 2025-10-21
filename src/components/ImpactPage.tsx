import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ArrowLeft, TrendingUp, DollarSign, Target, Users, AlertTriangle, FileText } from 'lucide-react';
import { Progress } from './ui/progress';

type ImpactPageProps = {
  onNavigate: (page: string) => void;
};

export function ImpactPage({ onNavigate }: ImpactPageProps) {
  const impactStats = [
    { label: 'Materials Saved', value: 45, icon: TrendingUp, color: 'text-blue-600' },
    { label: 'Money Saved', value: '$1,250', icon: DollarSign, color: 'text-blue-600' },
    { label: 'Items Lended', value: 23, icon: Target, color: 'text-blue-600' },
    { label: 'Social Connections', value: 18, icon: Users, color: 'text-blue-600' }
  ];

  const sdgGoals = [
    { id: 12, name: 'Responsible Consumption and Production', progress: 75 },
    { id: 11, name: 'Sustainable Cities and Communities', progress: 60 },
    { id: 13, name: 'Climate Action', progress: 55 },
    { id: 17, name: 'Partnerships for the Goals', progress: 80 }
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
          <Button 
            onClick={() => onNavigate('dashboard')} 
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-blue-600">Impact Dashboard</h1>
          <div className="w-32" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {impactStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="border-2 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                  <p className="text-blue-500 text-sm mb-1">{stat.label}</p>
                  <p className="text-blue-600">{stat.value}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* SDG Goals */}
        <Card className="border-2 border-blue-200 mb-8">
          <CardHeader>
            <CardTitle className="text-blue-600 flex items-center gap-2">
              <Target className="w-6 h-6" />
              UN Sustainable Development Goals Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {sdgGoals.map((goal) => (
              <div key={goal.id}>
                <div className="flex justify-between mb-2">
                  <p className="text-blue-600">SDG {goal.id}: {goal.name}</p>
                  <span className="text-blue-600">{goal.progress}%</span>
                </div>
                <Progress value={goal.progress} className="h-3" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Increased Socializing */}
        <Card className="border-2 border-blue-200 mb-8">
          <CardHeader>
            <CardTitle className="text-blue-600 flex items-center gap-2">
              <Users className="w-6 h-6" />
              Community Connections
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                <p className="text-blue-600">New Connections</p>
                <p className="text-blue-600">18 people</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                <p className="text-blue-600">Active Conversations</p>
                <p className="text-blue-600">32 chats</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                <p className="text-blue-600">Community Events</p>
                <p className="text-blue-600">5 attended</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Take Care Situations */}
        <Card className="border-2 border-blue-200 mb-8">
          <CardHeader>
            <CardTitle className="text-blue-600 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6" />
              Take Care Situations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-600 mb-2">• Always inspect items before borrowing or lending</p>
                <p className="text-blue-600 mb-2">• Report damage immediately upon discovery</p>
                <p className="text-blue-600 mb-2">• Return items on time to maintain trust</p>
                <p className="text-blue-600 mb-2">• Communicate clearly with lenders/borrowers</p>
                <p className="text-blue-600">• Keep items in the same or better condition</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Terms and Conditions */}
        <Card className="border-2 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-600 flex items-center gap-2">
              <FileText className="w-6 h-6" />
              Terms and Conditions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-blue-600">
              <div>
                <p className="mb-2">1. <strong>Responsibility:</strong> Users are responsible for items in their possession.</p>
              </div>
              <div>
                <p className="mb-2">2. <strong>Damage:</strong> Borrowers must compensate for damage beyond normal wear and tear.</p>
              </div>
              <div>
                <p className="mb-2">3. <strong>Returns:</strong> Items must be returned by the agreed deadline unless extended.</p>
              </div>
              <div>
                <p className="mb-2">4. <strong>Honesty:</strong> Accurate item descriptions and damage reporting are mandatory.</p>
              </div>
              <div>
                <p className="mb-2">5. <strong>Respect:</strong> Treat all community members and their items with respect.</p>
              </div>
              <div>
                <p className="mb-2">6. <strong>Safety:</strong> Do not lend or borrow dangerous or illegal items.</p>
              </div>
              <div>
                <p>7. <strong>Disputes:</strong> Platform mediates disputes; final decisions are binding.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
