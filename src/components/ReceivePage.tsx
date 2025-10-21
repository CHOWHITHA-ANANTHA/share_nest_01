import React, { useState } from 'react';
import { useApp } from '../App';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowLeft, Calendar, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { toast } from 'sonner@2.0.3';

type ReceivePageProps = {
  onNavigate: (page: string) => void;
};

export function ReceivePage({ onNavigate }: ReceivePageProps) {
  const { items, requestItem, user, confirmReturn } = useApp();
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleRequest = (itemId: string) => {
    requestItem(itemId);
    setSelectedItem(null);
    toast.success('Item requested successfully!');
  };

  const handleConfirmReturn = (itemId: string, isOwner: boolean) => {
    confirmReturn(itemId, isOwner);
    toast.success(isOwner ? 'Return confirmed as owner' : 'Return confirmed as receiver');
  };

  const getDamageColor = (level: number) => {
    if (level <= 3) return 'bg-green-500';
    if (level <= 6) return 'bg-yellow-500';
    return 'bg-red-500';
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
          <h1 className="text-blue-600">Receive Items</h1>
          <div className="w-32" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <p className="text-blue-600">Browse available items from the community</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => {
            const isCurrentUserOwner = item.ownerName === user?.username;
            const isCurrentUserReceiver = item.receiverName === user?.username;
            const bothConfirmed = item.ownerConfirmed && item.receiverConfirmed;

            return (
              <Card key={item.id} className="border-2 border-blue-200 overflow-hidden">
                <div className="relative h-48 bg-blue-50">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  {item.receiverId && (
                    <Badge className="absolute top-2 right-2 bg-blue-600">
                      In Use
                    </Badge>
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="text-blue-600">{item.name}</CardTitle>
                  <p className="text-blue-500 text-sm">by {item.ownerName}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-blue-600 text-sm">Quantity:</span>
                    <Badge variant="outline" className="border-blue-600 text-blue-600">
                      {item.quantity}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-600 text-sm">Quality:</span>
                    <Badge variant="outline" className="border-blue-600 text-blue-600">
                      {item.quality}/10
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-600 text-sm">Duration:</span>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <span className="text-blue-600 text-sm">
                        {item.duration === 'permanent' ? 'Permanent' : `${item.duration} days`}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-blue-600 text-sm">Damage Level:</span>
                      <span className="text-blue-600 text-sm">{item.damageLevel}/10</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getDamageColor(item.damageLevel)}`}
                        style={{ width: `${item.damageLevel * 10}%` }}
                      />
                    </div>
                  </div>

                  {item.receiverId && (
                    <div className="bg-blue-50 border border-blue-200 rounded p-3 space-y-2">
                      <p className="text-blue-600 text-sm">Currently with: <strong>{item.receiverName}</strong></p>
                      <div className="flex gap-2">
                        {item.ownerConfirmed ? (
                          <div className="flex items-center gap-1 text-green-600 text-sm">
                            <CheckCircle className="w-4 h-4" />
                            Owner confirmed
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-yellow-600 text-sm">
                            <AlertCircle className="w-4 h-4" />
                            Owner pending
                          </div>
                        )}
                        {item.receiverConfirmed ? (
                          <div className="flex items-center gap-1 text-green-600 text-sm">
                            <CheckCircle className="w-4 h-4" />
                            Receiver confirmed
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-yellow-600 text-sm">
                            <AlertCircle className="w-4 h-4" />
                            Receiver pending
                          </div>
                        )}
                      </div>
                      {!bothConfirmed && (
                        <div className="flex items-center gap-1 text-red-600 text-sm">
                          <XCircle className="w-4 h-4" />
                          Deadline tracking active
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex gap-2">
                  {!item.receiverId && !isCurrentUserOwner && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700">
                          Request Item
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="border-2 border-blue-200">
                        <DialogHeader>
                          <DialogTitle className="text-blue-600">Request {item.name}?</DialogTitle>
                          <DialogDescription className="text-blue-500">
                            You will be marked as the receiver of this item. Both you and the owner must confirm when the item is returned.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="flex gap-2">
                          <Button 
                            onClick={() => handleRequest(item.id)}
                            className="flex-1 bg-blue-600 hover:bg-blue-700"
                          >
                            Confirm Request
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                  {item.receiverId && isCurrentUserOwner && !item.ownerConfirmed && (
                    <Button 
                      onClick={() => handleConfirmReturn(item.id, true)}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      Confirm Return (Owner)
                    </Button>
                  )}
                  {item.receiverId && isCurrentUserReceiver && !item.receiverConfirmed && (
                    <Button 
                      onClick={() => handleConfirmReturn(item.id, false)}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      Confirm Return (Receiver)
                    </Button>
                  )}
                  {isCurrentUserOwner && !item.receiverId && (
                    <Badge variant="outline" className="w-full justify-center border-blue-600 text-blue-600">
                      Your Item
                    </Badge>
                  )}
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {items.length === 0 && (
          <div className="text-center py-12">
            <p className="text-blue-500">No items available at the moment</p>
          </div>
        )}
      </div>
    </div>
  );
}
