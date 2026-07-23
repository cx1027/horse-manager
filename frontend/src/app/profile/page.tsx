'use client';

import { useState, useEffect } from 'react';
import MicrographicsLayout from '@/components/layout/MicrographicsLayout';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Avatar from '@/components/ui/Avatar';
import {
  User,
  Mail,
  Phone,
  Building,
  Shield,
  Bell,
  Save,
  Loader2,
  Key,
  Smartphone,
  AlertTriangle
} from 'lucide-react';

interface UserData {
  id: number;
  username: string;
  email: string;
  role?: string;
  phone?: string;
  company?: string;
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setIsLoading(false);
    };
    loadUser();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" style={{ color: '#E12E6D' }} />
      </div>
    );
  }

  if (!user) {
    return (
      <MicrographicsLayout variant="dark">
        <div className="flex items-center justify-center min-h-[50vh]">
          <p className="text-white">Please log in first</p>
        </div>
      </MicrographicsLayout>
    );
  }

  const displayName = user.username || user.email?.split('@')[0] || 'User';

  const notifications = {
    email: true,
    push: true,
    insurance: true,
    vaccination: true,
  };

  return (
    <MicrographicsLayout variant="dark" fullWidth>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-white mb-3 tracking-tight">Profile</h1>
          <p className="text-lg text-gray-400">Manage your account settings and preferences</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-7 space-y-8">
            {/* Profile Card */}
            <div className="rounded-2xl p-8" style={{ background: 'linear-gradient(135deg, rgba(225, 46, 109, 0.15), rgba(168, 85, 247, 0.1))', border: '1px solid rgba(225, 46, 109, 0.3)' }}>
              <div className="flex items-start gap-6">
                <Avatar src={null} fallback={displayName} size="2xl" />
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <h2 className="text-3xl font-bold text-white">{displayName}</h2>
                    <Badge variant={user.role === 'investor' ? 'success' : 'primary'}>
                      {user.role === 'staff' ? 'Staff' : user.role === 'investor' ? 'Investor' : 'User'}
                    </Badge>
                  </div>
                  <p className="text-gray-400">Registered user</p>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                  className="border-white/20"
                >
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </Button>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="flex items-center gap-3 p-4 rounded-xl" style={{ background: 'rgba(0, 0, 0, 0.4)' }}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(225, 46, 109, 0.2)' }}>
                    <User className="w-5 h-5 text-pink-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Username</p>
                    <p className="text-white font-medium">{displayName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl" style={{ background: 'rgba(0, 0, 0, 0.4)' }}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(16, 185, 129, 0.2)' }}>
                    <Mail className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Email</p>
                    <p className="text-white font-medium text-sm">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl" style={{ background: 'rgba(0, 0, 0, 0.4)' }}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(245, 158, 11, 0.2)' }}>
                    <Phone className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Phone</p>
                    <p className="text-white font-medium">{user.phone || 'Not set'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl" style={{ background: 'rgba(0, 0, 0, 0.4)' }}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(168, 85, 247, 0.2)' }}>
                    <Building className="w-5 h-5 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Company</p>
                    <p className="text-white font-medium">{user.company || 'Not set'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Section */}
            <div className="rounded-2xl p-8" style={{ background: '#0A0A0A', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(225, 46, 109, 0.15)' }}>
                  <Shield className="w-5 h-5 text-pink-500" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">Security</h2>
                  <p className="text-sm text-gray-500">Manage your security settings</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 rounded-xl transition-colors cursor-pointer hover:bg-white/5">
                  <div className="flex items-center gap-4">
                    <Key className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-white font-medium">Password</p>
                      <p className="text-xs text-gray-500">Last changed 30 days ago</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-pink-500">Change</Button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl transition-colors cursor-pointer hover:bg-white/5">
                  <div className="flex items-center gap-4">
                    <Smartphone className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-white font-medium">Two-Factor Auth</p>
                      <p className="text-xs text-gray-500">Add extra security</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-pink-500">Enable</Button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Settings */}
          <div className="lg:col-span-5 space-y-8">
            {/* Notifications */}
            <div className="rounded-2xl p-8" style={{ background: '#0A0A0A', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(168, 85, 247, 0.15)' }}>
                  <Bell className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">Notifications</h2>
                  <p className="text-sm text-gray-500">Manage your alerts</p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { key: 'email', label: 'Email Notifications', desc: 'Receive email updates' },
                  { key: 'push', label: 'Push Notifications', desc: 'In-app notifications' },
                  { key: 'insurance', label: 'Insurance Reminders', desc: 'Policy expiry alerts' },
                  { key: 'vaccination', label: 'Vaccination Reminders', desc: 'Vaccination alerts' },
                ].map((item) => (
                  <label key={item.key} className="flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors hover:bg-white/5">
                    <div>
                      <p className="text-white font-medium">{item.label}</p>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked={notifications[item.key as keyof typeof notifications]}
                      className="w-5 h-5 rounded"
                      style={{ accentColor: '#E12E6D' }}
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Danger Zone */}
            <div className="rounded-2xl p-8" style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <h2 className="text-lg font-semibold text-white">Danger Zone</h2>
              </div>
              <div className="space-y-3">
                <Button variant="secondary" className="w-full border-white/20">
                  Export My Data
                </Button>
                <Button variant="danger" className="w-full">
                  Delete Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MicrographicsLayout>
  );
}
