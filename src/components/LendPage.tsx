import React, { useState } from 'react';
import { useApp } from '../App';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { ArrowLeft, Upload } from 'lucide-react';
import { Slider } from './ui/slider';
import { toast } from 'sonner@2.0.3';

type LendPageProps = {
  onNavigate: (page: string) => void;
};

export function LendPage({ onNavigate }: LendPageProps) {
  const { addItem } = useApp();
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [quality, setQuality] = useState([8]);
  const [damageLevel, setDamageLevel] = useState([2]);
  const [durationType, setDurationType] = useState<'days' | 'permanent'>('days');
  const [duration, setDuration] = useState('7');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && quantity) {
      addItem({
        name,
        image: image || 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=400',
        quantity: parseInt(quantity),
        quality: quality[0],
        duration: durationType === 'permanent' ? 'permanent' : parseInt(duration),
        damageLevel: damageLevel[0]
      });
      setName('');
      setImage('');
      setQuantity('1');
      setQuality([8]);
      setDamageLevel([2]);
      setDurationType('days');
      setDuration('7');
      toast.success('Item posted successfully!');
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
          <h1 className="text-blue-600">Lend Items</h1>
          <div className="w-32" />
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        <Card className="border-2 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-600">Post an Item to Lend</CardTitle>
            <p className="text-blue-500 text-sm">Share your items with the community</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-blue-600">Item Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Power Drill, Camping Tent, Books"
                  className="border-blue-300 focus:border-blue-600"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image" className="text-blue-600">Image URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="image"
                    type="url"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="border-blue-300 focus:border-blue-600"
                  />
                  <Button type="button" variant="outline" className="border-blue-600 text-blue-600">
                    <Upload className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-blue-500 text-sm">Leave empty for a default image</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    Quality: {quality[0]}/10
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
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="damageLevel" className="text-blue-600">
                  Damage Level: {damageLevel[0]}/10
                </Label>
                <Slider
                  id="damageLevel"
                  min={0}
                  max={10}
                  step={1}
                  value={damageLevel}
                  onValueChange={setDamageLevel}
                  className="py-4"
                />
                <div className="flex justify-between text-sm text-blue-500">
                  <span>No Damage</span>
                  <span>Heavily Damaged</span>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-blue-600">Lending Duration</Label>
                <RadioGroup value={durationType} onValueChange={(value: 'days' | 'permanent') => setDurationType(value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="days" id="days" />
                    <Label htmlFor="days" className="text-blue-600 cursor-pointer">Temporary (specify days)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="permanent" id="permanent" />
                    <Label htmlFor="permanent" className="text-blue-600 cursor-pointer">Permanent (giving away)</Label>
                  </div>
                </RadioGroup>

                {durationType === 'days' && (
                  <div className="space-y-2 ml-6">
                    <Label htmlFor="duration" className="text-blue-600">Number of Days</Label>
                    <Input
                      id="duration"
                      type="number"
                      min="1"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="border-blue-300 focus:border-blue-600"
                      required={durationType === 'days'}
                    />
                  </div>
                )}
              </div>

              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                <h4 className="text-blue-600 mb-2">Important Notes:</h4>
                <ul className="text-blue-600 text-sm space-y-1">
                  <li>• Once someone requests your item, their name will be visible to everyone</li>
                  <li>• Both you and the receiver must confirm when the item is returned</li>
                  <li>• If confirmation is delayed, a red mark will appear on the receiver's profile</li>
                  <li>• This helps maintain trust in the community</li>
                </ul>
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Post Item
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Tips */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-2 border-blue-200">
            <CardContent className="p-4">
              <h4 className="text-blue-600 mb-2">Take Clear Photos</h4>
              <p className="text-blue-500 text-sm">Good photos help others understand the item's condition</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-blue-200">
            <CardContent className="p-4">
              <h4 className="text-blue-600 mb-2">Be Honest</h4>
              <p className="text-blue-500 text-sm">Accurate descriptions build trust in the community</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-blue-200">
            <CardContent className="p-4">
              <h4 className="text-blue-600 mb-2">Set Realistic Timelines</h4>
              <p className="text-blue-500 text-sm">Consider how long you can part with the item</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
