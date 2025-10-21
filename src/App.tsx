import React, { useState, createContext, useContext } from 'react';
import { LoginPage } from './components/LoginPage';
import { Dashboard } from './components/Dashboard';
import { ImpactPage } from './components/ImpactPage';
import { ReceivePage } from './components/ReceivePage';
import { PostPage } from './components/PostPage';
import { RequestPage } from './components/RequestPage';
import { LendPage } from './components/LendPage';
import { ProfilePage } from './components/ProfilePage';
import { Toaster } from './components/ui/sonner';

type User = {
  username: string;
  pincode: string;
  medals: number;
};

type Post = {
  id: string;
  userId: string;
  username: string;
  text: string;
  image: string;
  date: string;
};

type Item = {
  id: string;
  name: string;
  image: string;
  quantity: number;
  quality: number;
  ownerId: string;
  ownerName: string;
  duration: number | 'permanent';
  damageLevel: number;
  receiverId?: string;
  receiverName?: string;
  ownerConfirmed?: boolean;
  receiverConfirmed?: boolean;
  deadlineCrossed?: boolean;
};

type Request = {
  id: string;
  userId: string;
  username: string;
  itemName: string;
  quantity: number;
  quality: number;
  timeline: string;
  date: string;
};

type AppContextType = {
  user: User | null;
  login: (username: string, password: string, pincode: string) => boolean;
  logout: () => void;
  posts: Post[];
  addPost: (text: string, image: string) => void;
  items: Item[];
  addItem: (item: Omit<Item, 'id' | 'ownerId' | 'ownerName'>) => void;
  requestItem: (itemId: string) => void;
  confirmReturn: (itemId: string, isOwner: boolean) => void;
  requests: Request[];
  addRequest: (request: Omit<Request, 'id' | 'userId' | 'username' | 'date'>) => void;
};

const AppContext = createContext<AppContextType | null>(null);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

export default function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      userId: 'demo',
      username: 'Sarah Chen',
      text: "Hey I've received this book collection and it's quite useful, I've saved loads of money! These books would have cost me $150+",
      image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400',
      date: '2025-10-18'
    },
    {
      id: '2',
      userId: 'demo2',
      username: 'John Smith',
      text: "Just borrowed a drill from the community. Saved $80 and met awesome neighbors! This platform is amazing.",
      image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400',
      date: '2025-10-17'
    }
  ]);
  const [items, setItems] = useState<Item[]>([
    {
      id: '1',
      name: 'Power Drill Set',
      image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400',
      quantity: 1,
      quality: 9,
      ownerId: 'user1',
      ownerName: 'Mike Johnson',
      duration: 7,
      damageLevel: 2
    },
    {
      id: '2',
      name: 'Camping Tent',
      image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=400',
      quantity: 1,
      quality: 8,
      ownerId: 'user2',
      ownerName: 'Emma Davis',
      duration: 14,
      damageLevel: 3
    },
    {
      id: '3',
      name: 'Study Books Collection',
      image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400',
      quantity: 5,
      quality: 10,
      ownerId: 'user3',
      ownerName: 'David Lee',
      duration: 'permanent',
      damageLevel: 1
    }
  ]);
  const [requests, setRequests] = useState<Request[]>([]);

  const login = (username: string, password: string, pincode: string) => {
    if (username && password && pincode) {
      setUser({ username, pincode, medals: 3 });
      setCurrentPage('dashboard');
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setCurrentPage('login');
  };

  const addPost = (text: string, image: string) => {
    if (!user) return;
    const newPost: Post = {
      id: Date.now().toString(),
      userId: user.username,
      username: user.username,
      text,
      image,
      date: new Date().toISOString().split('T')[0]
    };
    setPosts([newPost, ...posts]);
  };

  const addItem = (item: Omit<Item, 'id' | 'ownerId' | 'ownerName'>) => {
    if (!user) return;
    const newItem: Item = {
      ...item,
      id: Date.now().toString(),
      ownerId: user.username,
      ownerName: user.username
    };
    setItems([newItem, ...items]);
  };

  const requestItem = (itemId: string) => {
    if (!user) return;
    setItems(items.map(item => 
      item.id === itemId 
        ? { ...item, receiverId: user.username, receiverName: user.username }
        : item
    ));
  };

  const confirmReturn = (itemId: string, isOwner: boolean) => {
    setItems(items.map(item => {
      if (item.id === itemId) {
        if (isOwner) {
          return { ...item, ownerConfirmed: true };
        } else {
          return { ...item, receiverConfirmed: true };
        }
      }
      return item;
    }));
  };

  const addRequest = (request: Omit<Request, 'id' | 'userId' | 'username' | 'date'>) => {
    if (!user) return;
    const newRequest: Request = {
      ...request,
      id: Date.now().toString(),
      userId: user.username,
      username: user.username,
      date: new Date().toISOString().split('T')[0]
    };
    setRequests([newRequest, ...requests]);
  };

  const contextValue: AppContextType = {
    user,
    login,
    logout,
    posts,
    addPost,
    items,
    addItem,
    requestItem,
    confirmReturn,
    requests,
    addRequest
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div className="min-h-screen bg-white">
        {currentPage === 'login' && <LoginPage onNavigate={setCurrentPage} />}
        {currentPage === 'dashboard' && <Dashboard onNavigate={setCurrentPage} />}
        {currentPage === 'impact' && <ImpactPage onNavigate={setCurrentPage} />}
        {currentPage === 'receive' && <ReceivePage onNavigate={setCurrentPage} />}
        {currentPage === 'post' && <PostPage onNavigate={setCurrentPage} />}
        {currentPage === 'request' && <RequestPage onNavigate={setCurrentPage} />}
        {currentPage === 'lend' && <LendPage onNavigate={setCurrentPage} />}
        {currentPage === 'profile' && <ProfilePage onNavigate={setCurrentPage} />}
        <Toaster />
      </div>
    </AppContext.Provider>
  );
}
