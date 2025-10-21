import React, { useState } from 'react';
import { useApp } from '../App';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { ArrowLeft, Send, Heart, MessageCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

type PostPageProps = {
  onNavigate: (page: string) => void;
};

export function PostPage({ onNavigate }: PostPageProps) {
  const { posts, addPost, user } = useApp();
  const [newPostText, setNewPostText] = useState('');
  const [newPostImage, setNewPostImage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPostText.trim()) {
      addPost(newPostText, newPostImage || 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=400');
      setNewPostText('');
      setNewPostImage('');
      toast.success('Post shared successfully!');
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
          <h1 className="text-blue-600">Community Posts</h1>
          <div className="w-32" />
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        {/* Create Post Form */}
        <Card className="border-2 border-blue-200 mb-8">
          <CardHeader>
            <h3 className="text-blue-600">Share Your Experience</h3>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="postText" className="text-blue-600">Your Story</Label>
                <Textarea
                  id="postText"
                  value={newPostText}
                  onChange={(e) => setNewPostText(e.target.value)}
                  placeholder="Hey I've received this item and it's quite useful, I've saved loads of money..."
                  className="border-blue-300 focus:border-blue-600 min-h-24"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postImage" className="text-blue-600">Image URL (optional)</Label>
                <input
                  id="postImage"
                  type="url"
                  value={newPostImage}
                  onChange={(e) => setNewPostImage(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-3 py-2 border-2 border-blue-300 rounded-md focus:outline-none focus:border-blue-600"
                />
                <p className="text-blue-500 text-sm">Leave empty for a default image</p>
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                <Send className="w-4 h-4 mr-2" />
                Share Post
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Posts Feed */}
        <div className="space-y-6">
          <h3 className="text-blue-600">Community Feedback</h3>
          {posts.map((post) => (
            <Card key={post.id} className="border-2 border-blue-200 overflow-hidden">
              <div className="relative h-64 bg-blue-50">
                <ImageWithFallback
                  src={post.image}
                  alt="Post image"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-blue-600">{post.username}</h4>
                    <p className="text-blue-500 text-sm">{post.date}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-blue-600 mb-4">{post.text}</p>
                <div className="flex gap-4">
                  <Button variant="outline" size="sm" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                    <Heart className="w-4 h-4 mr-2" />
                    Like
                  </Button>
                  <Button variant="outline" size="sm" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Comment
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-blue-500">No posts yet. Be the first to share your experience!</p>
          </div>
        )}
      </div>
    </div>
  );
}
