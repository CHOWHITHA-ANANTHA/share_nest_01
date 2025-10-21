import React, { useState } from 'react';
import { useApp } from '../App';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ArrowLeft, Send } from 'lucide-react';
import { Slider } from './ui/slider';
import { toast } from 'sonner@2.0.3';

type RequestPageProps = {
  onNavigate: (page: string) => void;
};

export function RequestPage({ onNavigate }: RequestPageProps) {
  const { addRequest, requests } = useApp();
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [quality, setQuality] = useState([7]);
  const [timeline, setTimeline] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (itemName && quantity && timeline) {
      addRequest({
        itemName,
        quantity: parseInt(quantity),
        quality: quality[0],
        timeline
      });
      setItemName('');
      setQuantity('1');
      setQuality([7]);
      setTimeline('');
      toast.success('Request submitted successfully!');
    }
  };

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
          <h1 className="text-blue-600">Request Items</h1>
          <div className="w-32" />
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Request Form */}
          <div>
            <Card className="border-2 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-600">Submit a Request</CardTitle>
                <p className="text-blue-500 text-sm">Tell the community what you need</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="itemName" className="text-blue-600">Item Name</Label>
                    <Input
                      id="itemName"
                      type="text"
                      value={itemName}
                      onChange={(e) => setItemName(e.target.value)}
                      placeholder="e.g., Lawn Mower, Projector, Ladder"
                      className="border-blue-300 focus:border-blue-600"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quantity" className="text-blue-600">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="border-blue-300 focus:border-blue-600"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quality" className="text-blue-600">
                      Quality Required: {quality[0]}/10
                    </Label>
                    <Slider
                      id="quality"
                      min={1}
                      max={10}
                      step={1}
                      value={quality}
                      onValueChange={setQuality}
                      className="py-4"
                    />
                    <div className="flex justify-between text-sm text-blue-500">
                      <span>Any Condition</span>
                      <span>Like New</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timeline" className="text-blue-600">Timeline</Label>
                    <Input
                      id="timeline"
                      type="text"
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      placeholder="e.g., 3 days, 1 week, 2 months"
                      className="border-blue-300 focus:border-blue-600"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    <Send className="w-4 h-4 mr-2" />
                    Submit Request
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Your Requests */}
          <div>
            <h3 className="text-blue-600 mb-4">Your Requests</h3>
            <div className="space-y-4">
              {requests.length === 0 ? (
                <Card className="border-2 border-blue-200">
                  <CardContent className="p-8 text-center">
                    <p className="text-blue-500">No requests submitted yet</p>
                  </CardContent>
                </Card>
              ) : (
                requests.map((request) => (
                  <Card key={request.id} className="border-2 border-blue-200">
                    <CardHeader>
                      <CardTitle className="text-blue-600">{request.itemName}</CardTitle>
                      <p className="text-blue-500 text-sm">Requested on {request.date}</p>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-blue-600">Quantity:</span>
                        <span className="text-blue-600">{request.quantity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-600">Quality Required:</span>
                        <span className="text-blue-600">{request.quality}/10</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-600">Timeline:</span>
                        <span className="text-blue-600">{request.timeline}</span>
                      </div>
                      <div className="pt-2">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-600 border border-blue-300">
                          Active Request
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Community Requests */}
        <div className="mt-12">
          <h3 className="text-blue-600 mb-4">Community Requests</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {requests.length > 0 ? (
              requests.map((request) => (
                <Card key={request.id} className="border-2 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-600">{request.itemName}</CardTitle>
                    <p className="text-blue-500 text-sm">by {request.username}</p>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-blue-600 text-sm">Quantity: {request.quantity}</p>
                    <p className="text-blue-600 text-sm">Quality: {request.quality}/10</p>
                    <p className="text-blue-600 text-sm">Timeline: {request.timeline}</p>
                    <Button size="sm" className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                      Offer to Lend
                    </Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-2">
                <Card className="border-2 border-blue-200">
                  <CardContent className="p-8 text-center">
                    <p className="text-blue-500">No community requests at the moment</p>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
