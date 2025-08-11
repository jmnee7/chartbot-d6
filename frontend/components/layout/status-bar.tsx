'use client';

import { useState, useEffect } from 'react';
import { Wifi, Signal, Battery } from 'lucide-react';

export function StatusBar() {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('ko-KR', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      });
      setCurrentTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-between px-4 py-1 text-xs font-medium text-gray-900 bg-white border-b border-gray-100 h-8">
      {/* Left side - Time */}
      <div className="font-semibold">
        {currentTime}
      </div>
      
      {/* Right side - Status icons */}
      <div className="flex items-center gap-1">
        {/* Signal strength */}
        <Signal className="h-3 w-3" />
        
        {/* Wifi */}
        <Wifi className="h-3 w-3" />
        
        {/* Battery */}
        <div className="flex items-center gap-0.5">
          <Battery className="h-3 w-3" />
          <span className="text-[10px]">87%</span>
        </div>
      </div>
    </div>
  );
}