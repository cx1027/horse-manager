import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'HorseInfo - 马匹信息管理平台',
  description: '专业的马匹信息管理分享平台，支持马匹档案、医疗记录、健康数据等功能',
  manifest: '/manifest.json',
  themeColor: '#0f0f23',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'HorseInfo',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body className="min-h-screen bg-background-primary">{children}</body>
    </html>
  );
}
