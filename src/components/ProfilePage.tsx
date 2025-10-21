import React from 'react';
import { useApp } from '../App';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback } from './ui/avatar';
import { ArrowLeft, Award, Package, Inbox, MessageSquare, TrendingUp, Medal } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

type ProfilePageProps = {
  onNavigate: (page: string) => void;
};

export function ProfilePage({ onNavigate }: ProfilePageProps) {
  const { user, posts, items, requests } = useApp();

  const userPosts = posts.filter(p => p.username === user?.username);
  const userLendedItems = items.filter(i => i.ownerName === user?.username);
  const userReceivedItems = items.filter(i => i.receiverName === user?.username);

  const getMedalBadge = (medals: number) => {
    if (medals >= 10) return { name: 'Gold Member', color: 'bg-yellow-500', icon: '🏆' };
    if (medals >= 5) return { name: 'Silver Member', color: 'bg-gray-400', icon: '🥈' };
    if (medals >= 1) return { name: 'Bronze Member', color: 'bg-orange-600', icon: '🥉' };
    return { name: 'New Member', color: 'bg-blue-600', icon: '⭐' };
  };

  const badge = getMedalBadge(user?.medals || 0);

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
          <h1 className="text-blue-600">Profile</h1>
          <div className="w-32" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="border-2 border-blue-200 mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <Avatar className="w-24 h-24 border-4 border-blue-600">
                <AvatarFallback className="bg-blue-600 text-white text-3xl">
                  {user?.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-blue-600 mb-2">{user?.username}</h2>
                <p className="text-blue-500 mb-4">Pincode: {user?.pincode}</p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <Badge className={`${badge.color} text-white`}>
                    {badge.icon} {badge.name}
                  </Badge>
                  <Badge variant="outline" className="border-blue-600 text-blue-600">
                    <Award className="w-4 h-4 mr-1" />
                    {user?.medals} Medals
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 text-center">
                  <Package className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-blue-600">{userLendedItems.length}</p>
                  <p className="text-blue-500 text-sm">Items Lended</p>
                </div>
                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 text-center">
                  <Inbox className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-blue-600">{userReceivedItems.length}</p>
                  <p className="text-blue-500 text-sm">Items Received</p>
                </div>
                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 text-center">
                  <MessageSquare className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-blue-600">{userPosts.length}</p>
                  <p className="text-blue-500 text-sm">Posts</p>
                </div>
                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 text-center">
                  <TrendingUp className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-blue-600">$450</p>
                  <p className="text-blue-500 text-sm">Saved</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Medal System Info */}
        <Card className="border-2 border-blue-200 mb-8">
          <CardHeader>
            <CardTitle className="text-blue-600 flex items-center gap-2">
              <Medal className="w-6 h-6" />
              Gamification System
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-blue-600">Earn medals by contributing to the community. More accepted donations = more medals!</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                  <div className="text-3xl mb-2">🥉</div>
                  <p className="text-blue-600">Bronze Member</p>
                  <p className="text-blue-500 text-sm">1-4 medals</p>
                </div>
                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                  <div className="text-3xl mb-2">🥈</div>
                  <p className="text-blue-600">Silver Member</p>
                  <p className="text-blue-500 text-sm">5-9 medals</p>
                </div>
                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                  <div className="text-3xl mb-2">🏆</div>
                  <p className="text-blue-600">Gold Member</p>
                  <p className="text-blue-500 text-sm">10+ medals</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activity Tabs */}
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid w-full grid-cols-4 border-2 border-blue-200">
            <TabsTrigger value="posts" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Posts
            </TabsTrigger>
            <TabsTrigger value="lended" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Lended
            </TabsTrigger>
            <TabsTrigger value="received" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Received
            </TabsTrigger>
            <TabsTrigger value="requests" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Requests
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userPosts.length === 0 ? (
                <Card className="border-2 border-blue-200 col-span-2">
                  <CardContent className="p-8 text-center">
                    <p className="text-blue-500">No posts yet</p>
                  </CardContent>
                </Card>
              ) : (
                userPosts.map((post) => (
                  <Card key={post.id} className="border-2 border-blue-200">
                    <div className="relative h-48 bg-blue-50">
                      <ImageWithFallback
                        src={post.image}
                        alt="Post"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <p className="text-blue-500 text-sm">{post.date}</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-blue-600">{post.text}</p>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="lended" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {userLendedItems.length === 0 ? (
                <Card className="border-2 border-blue-200 col-span-3">
                  <CardContent className="p-8 text-center">
                    <p className="text-blue-500">No items lended yet</p>
                  </CardContent>
                </Card>
              ) : (
                userLendedItems.map((item) => (
                  <Card key={item.id} className="border-2 border-blue-200">
                    <div className="relative h-32 bg-blue-50">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-blue-600">{item.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1 text-sm">
                        <p className="text-blue-600">Quality: {item.quality}/10</p>
                        <p className="text-blue-600">
                          Duration: {item.duration === 'permanent' ? 'Permanent' : `${item.duration} days`}
                        </p>
                        {item.receiverId && (
                          <Badge className="bg-blue-600 mt-2">Currently with {item.receiverName}</Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="received" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {userReceivedItems.length === 0 ? (
                <Card className="border-2 border-blue-200 col-span-3">
                  <CardContent className="p-8 text-center">
                    <p className="text-blue-500">No items received yet</p>
                  </CardContent>
                </Card>
              ) : (
                userReceivedItems.map((item) => (
                  <Card key={item.id} className="border-2 border-blue-200">
                    <div className="relative h-32 bg-blue-50">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-blue-600">{item.name}</CardTitle>
                      <p className="text-blue-500 text-sm">from {item.ownerName}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1 text-sm">
                        <p className="text-blue-600">Quality: {item.quality}/10</p>
                        <p className="text-blue-600">
                          Duration: {item.duration === 'permanent' ? 'Permanent' : `${item.duration} days`}
                        </p>
                        {!item.receiverConfirmed && (
                          <Badge variant="outline" className="border-yellow-600 text-yellow-600 mt-2">
                            Return pending
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="requests" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {requests.length === 0 ? (
                <Card className="border-2 border-blue-200 col-span-2">
                  <CardContent className="p-8 text-center">
                    <p className="text-blue-500">No requests yet</p>
                  </CardContent>
                </Card>
              ) : (
                requests.map((request) => (
                  <Card key={request.id} className="border-2 border-blue-200">
                    <CardHeader>
                      <CardTitle className="text-blue-600">{request.itemName}</CardTitle>
                      <p className="text-blue-500 text-sm">{request.date}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <p className="text-blue-600">Quantity: {request.quantity}</p>
                        <p className="text-blue-600">Quality: {request.quality}/10</p>
                        <p className="text-blue-600">Timeline: {request.timeline}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
