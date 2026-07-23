'use client';

import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import Card from '@/components/ui/Card';
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
  Eye,
  EyeOff,
  Save,
  Loader2
} from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337/api';

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
  const [showPassword, setShowPassword] = useState(false);
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
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  if (!user) {
    return (
      <Layout user={null}>
        <div className="flex items-center justify-center min-h-[50vh]">
          <p className="text-text-secondary">请先登录</p>
        </div>
      </Layout>
    );
  }

  const displayName = user.username || user.email?.split('@')[0] || '用户';

  const notifications = {
    email: true,
    push: true,
    insurance: true,
    vaccination: true,
  };

  return (
    <Layout user={user}>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="heading-2 mb-2">个人资料</h1>
        <p className="text-text-secondary">管理您的账号信息</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="heading-4">基本信息</h2>
              <Button 
                variant="secondary" 
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? '取消' : '编辑'}
              </Button>
            </div>

            <div className="flex items-start gap-6 mb-6">
              <Avatar src={null} name={displayName} size="xl" />
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-text-primary mb-1">{displayName}</h3>
                <Badge variant={user.role === 'admin' ? 'primary' : user.role === 'investor' ? 'success' : 'secondary'}>
                  {user.role === 'admin' ? '管理员' : user.role === 'staff' ? '员工' : user.role === 'investor' ? '投资者' : '用户'}
                </Badge>
                <p className="text-sm text-text-secondary mt-2">
                  注册用户
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-background-secondary rounded-xl">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-text-secondary">用户名</p>
                  <p className="text-text-primary font-medium">{displayName}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-background-secondary rounded-xl">
                <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="text-sm text-text-secondary">邮箱</p>
                  <p className="text-text-primary font-medium">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-background-secondary rounded-xl">
                <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5 text-warning" />
                </div>
                <div>
                  <p className="text-sm text-text-secondary">电话</p>
                  <p className="text-text-primary font-medium">{user.phone || '未设置'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-background-secondary rounded-xl">
                <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
                  <Building className="w-5 h-5 text-error" />
                </div>
                <div>
                  <p className="text-sm text-text-secondary">公司</p>
                  <p className="text-text-primary font-medium">{user.company || '未设置'}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Security */}
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-5 h-5 text-accent" />
              <h2 className="heading-4">安全设置</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-background-secondary rounded-xl">
                <div>
                  <p className="text-text-primary font-medium">密码</p>
                  <p className="text-sm text-text-secondary">上次修改于 30 天前</p>
                </div>
                <Button variant="secondary" size="sm">修改密码</Button>
              </div>

              <div className="flex items-center justify-between p-4 bg-background-secondary rounded-xl">
                <div>
                  <p className="text-text-primary font-medium">双因素认证</p>
                  <p className="text-sm text-text-secondary">为您的账号添加额外的安全保护</p>
                </div>
                <Button variant="secondary" size="sm">启用</Button>
              </div>

              <div className="flex items-center justify-between p-4 bg-background-secondary rounded-xl">
                <div>
                  <p className="text-text-primary font-medium">Google 登录</p>
                  <p className="text-sm text-text-secondary">已关联 Google 账号</p>
                </div>
                <Badge variant="success">已连接</Badge>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Notifications */}
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-5 h-5 text-accent" />
              <h2 className="heading-4">通知设置</h2>
            </div>

            <div className="space-y-4">
              <label className="flex items-center justify-between p-3 bg-background-secondary rounded-xl cursor-pointer hover:bg-background-primary transition-colors">
                <div>
                  <p className="text-text-primary font-medium">邮件通知</p>
                  <p className="text-xs text-text-secondary">接收邮件更新</p>
                </div>
                <input 
                  type="checkbox" 
                  defaultChecked={notifications.email}
                  className="w-5 h-5 rounded border-border bg-background-secondary text-accent focus:ring-accent"
                />
              </label>

              <label className="flex items-center justify-between p-3 bg-background-secondary rounded-xl cursor-pointer hover:bg-background-primary transition-colors">
                <div>
                  <p className="text-text-primary font-medium">推送通知</p>
                  <p className="text-xs text-text-secondary">接收应用内通知</p>
                </div>
                <input 
                  type="checkbox" 
                  defaultChecked={notifications.push}
                  className="w-5 h-5 rounded border-border bg-background-secondary text-accent focus:ring-accent"
                />
              </label>

              <label className="flex items-center justify-between p-3 bg-background-secondary rounded-xl cursor-pointer hover:bg-background-primary transition-colors">
                <div>
                  <p className="text-text-primary font-medium">保险提醒</p>
                  <p className="text-xs text-text-secondary">保险即将到期提醒</p>
                </div>
                <input 
                  type="checkbox" 
                  defaultChecked={notifications.insurance}
                  className="w-5 h-5 rounded border-border bg-background-secondary text-accent focus:ring-accent"
                />
              </label>

              <label className="flex items-center justify-between p-3 bg-background-secondary rounded-xl cursor-pointer hover:bg-background-primary transition-colors">
                <div>
                  <p className="text-text-primary font-medium">疫苗提醒</p>
                  <p className="text-xs text-text-secondary">疫苗接种提醒</p>
                </div>
                <input 
                  type="checkbox" 
                  defaultChecked={notifications.vaccination}
                  className="w-5 h-5 rounded border-border bg-background-secondary text-accent focus:ring-accent"
                />
              </label>
            </div>
          </Card>

          {/* Danger Zone */}
          <Card className="border-error/30">
            <h2 className="heading-4 mb-4 text-error">危险区域</h2>
            <div className="space-y-3">
              <Button variant="secondary" className="w-full">
                导出我的数据
              </Button>
              <Button variant="danger" className="w-full">
                删除账号
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
