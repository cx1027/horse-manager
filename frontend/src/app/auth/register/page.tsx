'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Eye, EyeOff } from 'lucide-react';
import MicrographicsLayout from '@/components/layout/MicrographicsLayout';
import Image from 'next/image';

const ROLES = [
  { value: 'user', label: 'Regular User', description: 'Manage your own horses' },
  { value: 'investor', label: 'Investor', description: 'View horse financial information' },
  { value: 'staff', label: 'Staff', description: 'Assist with horse management' },
];

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337/api';

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
    <MicrographicsLayout variant="light">
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-md relative">
          {/* Logo */}
          <div className="flex items-center justify-center mb-6">
            <div className="relative w-[200px] h-[160px]">
              <Image
                src="/images/background.webp"
                alt=""
                fill
                className="object-contain"
                unoptimized
              />
            </div>
          </div>

          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2" style={{ color: '#000000' }}>Create Account</h1>
            <p style={{ color: '#666666' }}>Join HorseInfo and start managing your horses</p>
          </div>

          {/* Google Sign Up */}
          <button
            onClick={handleGoogleRegister}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-medium transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed mb-6"
            style={{
              background: 'rgba(0,0,0,0.05)',
              border: '1px solid rgba(0,0,0,0.1)',
              color: '#000000'
            }}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px" style={{ background: 'rgba(0,0,0,0.1)' }} />
            <span className="text-sm" style={{ color: '#666666' }}>or</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(0,0,0,0.1)' }} />
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#666666' }}>
                Username
              </label>
              <input
                type="text"
                name="username"
                placeholder="Choose a username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full px-4 py-4 rounded-xl outline-none transition-all"
                style={{
                  background: 'rgba(0,0,0,0.03)',
                  border: '1px solid rgba(0,0,0,0.1)',
                  color: '#000000'
                }}
                onFocus={(e) => e.target.style.borderColor = '#E12E6D'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(0,0,0,0.1)'}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#666666' }}>
                Email Address
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
                  background: 'rgba(0,0,0,0.03)',
                  border: '1px solid rgba(0,0,0,0.1)',
                  color: '#000000'
                }}
                onFocus={(e) => e.target.style.borderColor = '#E12E6D'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(0,0,0,0.1)'}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#666666' }}>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="At least 8 characters"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-4 pr-12 rounded-xl outline-none transition-all"
                  style={{
                    background: 'rgba(0,0,0,0.03)',
                    border: '1px solid rgba(0,0,0,0.1)',
                    color: '#000000'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#E12E6D'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(0,0,0,0.1)'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  style={{ color: '#666666' }}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#666666' }}>
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Re-enter password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-4 pr-12 rounded-xl outline-none transition-all"
                  style={{
                    background: 'rgba(0,0,0,0.03)',
                    border: '1px solid rgba(0,0,0,0.1)',
                    color: '#000000'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#E12E6D'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(0,0,0,0.1)'}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  style={{ color: '#666666' }}
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#666666' }}>
                Select Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-4 rounded-xl outline-none transition-all appearance-none cursor-pointer"
                style={{
                  background: 'rgba(0,0,0,0.03)',
                  border: '1px solid rgba(0,0,0,0.1)',
                  color: '#000000',
                }}
                onFocus={(e) => e.target.style.borderColor = '#E12E6D'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(0,0,0,0.1)'}
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

            <p className="text-sm" style={{ color: '#666666' }}>
              By registering you agree to our{' '}
              <Link href="/terms" style={{ color: '#E12E6D' }} className="hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" style={{ color: '#E12E6D' }} className="hover:underline">
                Privacy Policy
              </Link>
            </p>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-xl font-semibold text-white transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{
                background: 'linear-gradient(135deg, #E12E6D, #A855F7)',
                boxShadow: '0 4px 20px rgba(225, 46, 109, 0.3)'
              }}
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
              {!isLoading && <ArrowRight className="w-5 h-5" />}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center mt-8" style={{ color: '#666666' }}>
            Already have an account?{' '}
            <Link href="/auth/login" style={{ color: '#E12E6D' }} className="font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </MicrographicsLayout>
  );
}
