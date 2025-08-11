'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BarChart3, Vote, Play, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: '홈', href: '/', icon: Home },
  { name: '차트', href: '/charts', icon: BarChart3 },
  { name: '투표', href: '/votes', icon: Vote },
  { name: '스트리밍', href: '/streaming', icon: Play },
  { name: '가이드', href: '/guide', icon: BookOpen },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
      {/* Home indicator */}
      <div className="flex justify-center pt-1 pb-2">
        <div className="w-32 h-1 bg-gray-300 rounded-full"></div>
      </div>
      
      <div className="grid grid-cols-5 pb-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 py-2 px-1 text-xs font-medium transition-colors rounded-lg mx-1',
                isActive 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              )}
            >
              <item.icon className={cn('h-5 w-5', isActive && 'text-blue-600')} />
              <span className={cn('text-[10px]', isActive && 'text-blue-600 font-semibold')}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}