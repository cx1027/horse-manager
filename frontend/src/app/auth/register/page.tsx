'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Eye, EyeOff } from 'lucide-react';
import HorseIcon from '@/components/ui/HorseIcon';

const ROLES = [
  { value: 'user', label: '普通用户', description: '可以管理自己的马匹' },
  { value: 'investor', label: '投资者', description: '可以查看马匹财务信息' },
  { value: 'staff', label: '员工', description: '可以协助管理马匹' },
];

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337/api';

// API helper function
async function apiRegister(username: string, email: string, password: string, role: string) {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password, role }),
  });
  return response.json();
}

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGoogleRegister = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    router.push('/dashboard');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('密码不匹配');
      return;
    }

    if (formData.password.length < 8) {
      setError('密码至少需要8位字符');
      return;
    }

    setIsLoading(true);
    
    try {
      const data = await apiRegister(
        formData.username,
        formData.email,
        formData.password,
        formData.role
      );

      // 保存 token 并跳转
      localStorage.setItem('authToken', data.jwt);
      localStorage.setItem('user', JSON.stringify(data.user));
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : '注册失败，请稍后重试');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex"
      style={{ background: '#121212' }}
    >
      {/* Left Side - Decorative */}
      <div 
        className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center p-12 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #1a0a15 0%, #0f0f23 100%)'
        }}
      >
        {/* Decorative circles */}
        <div 
          className="absolute w-[400px] h-[400px] rounded-full opacity-30"
          style={{ 
            background: 'radial-gradient(circle, #E12E6D 0%, transparent 70%)',
            top: '10%',
            left: '20%'
          }}
        />
        <div 
          className="absolute w-[300px] h-[300px] rounded-full opacity-20"
          style={{ 
            background: 'radial-gradient(circle, #A855F7 0%, transparent 70%)',
            bottom: '15%',
            right: '10%'
          }}
        />
        
        <div className="relative z-10 text-center">
          <div 
            className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8"
            style={{ 
              background: 'linear-gradient(135deg, #E12E6D, #A855F7)',
              boxShadow: '0 8px 32px rgba(225, 46, 109, 0.4)'
            }}
          >
            <HorseIcon className="w-14 h-14 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">HorseInfo</h2>
          <p className="text-lg max-w-md" style={{ color: '#A0A0A0' }}>
            加入 HorseInfo 开始管理您的马匹，与千万马匹爱好者一起分享
          </p>
        </div>
      </div>

      {/* Right Side - Register Form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ 
                background: 'linear-gradient(135deg, #E12E6D, #A855F7)',
                boxShadow: '0 4px 20px rgba(225, 46, 109, 0.4)'
              }}
            >
              <HorseIcon className="w-10 h-10 text-white" />
            </div>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">创建账号</h1>
            <p style={{ color: '#6B6B6B' }}>加入 HorseInfo 开始管理您的马匹</p>
          </div>

          {/* Google Sign Up */}
          <button
            onClick={handleGoogleRegister}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-medium transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed mb-6"
            style={{ 
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'white'
            }}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            使用 Google 注册
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.1)' }} />
            <span className="text-sm" style={{ color: '#6B6B6B' }}>或</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.1)' }} />
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#A0A0A0' }}>
                用户名
              </label>
              <input
                type="text"
                name="username"
                placeholder="选择用户名"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full px-4 py-4 rounded-xl outline-none transition-all"
                style={{ 
                  background: '#1E1E1E',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'white'
                }}
                onFocus={(e) => e.target.style.borderColor = '#E12E6D'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#A0A0A0' }}>
                邮箱地址
              </label>
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-4 rounded-xl outline-none transition-all"
                style={{ 
                  background: '#1E1E1E',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'white'
                }}
                onFocus={(e) => e.target.style.borderColor = '#E12E6D'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#A0A0A0' }}>
                密码
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="至少8位字符"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-4 pr-12 rounded-xl outline-none transition-all"
                  style={{ 
                    background: '#1E1E1E',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'white'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#E12E6D'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  style={{ color: '#6B6B6B' }}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#A0A0A0' }}>
                确认密码
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="再次输入密码"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-4 pr-12 rounded-xl outline-none transition-all"
                  style={{ 
                    background: '#1E1E1E',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'white'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#E12E6D'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  style={{ color: '#6B6B6B' }}
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#A0A0A0' }}>
                选择角色
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-4 rounded-xl outline-none transition-all appearance-none cursor-pointer"
                style={{
                  background: '#1E1E1E',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'white',
                }}
                onFocus={(e) => e.target.style.borderColor = '#E12E6D'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              >
                {ROLES.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label} - {role.description}
                  </option>
                ))}
              </select>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 rounded-lg" style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                <p className="text-sm" style={{ color: '#EF4444' }}>{error}</p>
              </div>
            )}

            <p className="text-sm" style={{ color: '#6B6B6B' }}>
              注册即表示您同意我们的{' '}
              <Link href="/terms" style={{ color: '#E12E6D' }} className="hover:underline">
                服务条款
              </Link>{' '}
              和{' '}
              <Link href="/privacy" style={{ color: '#E12E6D' }} className="hover:underline">
                隐私政策
              </Link>
            </p>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-xl font-semibold text-white transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ 
                background: 'linear-gradient(135deg, #E12E6D, #A855F7)',
                boxShadow: '0 4px 20px rgba(225, 46, 109, 0.3)'
              }}
            >
              {isLoading ? '创建中...' : '创建账号'}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center mt-8" style={{ color: '#6B6B6B' }}>
            已有账号？{' '}
            <Link href="/auth/login" style={{ color: '#E12E6D' }} className="font-medium hover:underline">
              立即登录
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
