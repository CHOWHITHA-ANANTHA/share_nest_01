import React, { useState } from 'react';
import { useApp } from '../App';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Lock, User, Hash } from 'lucide-react';

type LoginPageProps = {
  onNavigate: (page: string) => void;
};

export function LoginPage({ onNavigate }: LoginPageProps) {
  const { login } = useApp();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [pincode, setPincode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(username, password, pincode)) {
      onNavigate('dashboard');
    } else {
      setError('Please fill in all fields');
    }
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Blue Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full" style={{
          backgroundImage: 'linear-gradient(#2563eb 1px, transparent 1px), linear-gradient(90deg, #2563eb 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          <div className="bg-white border-2 border-blue-600 rounded-lg p-8 shadow-lg">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-blue-600 mb-2">ShareHub Login</h1>
              <p className="text-blue-500">Join our community of sharers</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-blue-600">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-blue-500" />
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10 border-blue-300 focus:border-blue-600"
                    placeholder="Enter your username"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-blue-600">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-blue-500" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 border-blue-300 focus:border-blue-600"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pincode" className="text-blue-600">Pincode</Label>
                <div className="relative">
                  <Hash className="absolute left-3 top-3 h-5 w-5 text-blue-500" />
                  <Input
                    id="pincode"
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="pl-10 border-blue-300 focus:border-blue-600"
                    placeholder="Enter your pincode"
                  />
                </div>
              </div>

              {error && (
                <div className="text-red-600 text-sm text-center">{error}</div>
              )}

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Login
              </Button>

              <div className="text-center text-sm text-blue-500">
                Don't have an account? <span className="text-blue-600 cursor-pointer hover:underline">Sign up</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
