"use client";

import React, { useEffect, useState } from 'react';
import { 
  LayoutDashboard, 
  ShieldCheck, 
  Building2, 
  Users, 
  BarChart3, 
  LogOut 
} from 'lucide-react';

const menuItems = [
  { name: 'Dashboard', icon: LayoutDashboard, active: true },
  { name: 'Moderation', icon: ShieldCheck, active: false },
  { name: 'Company Management', icon: Building2, active: false },
  { name: 'User Roles', icon: Users, active: false },
];

export function AdminSideBar() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <aside className="w-64 h-screen bg-[#0A1A14] border-r border-emerald-900/20" />;
  }

  return (
    <aside className="w-64 h-screen bg-[#0A1A14] text-white flex flex-col justify-between border-r border-emerald-900/20">
      <div>
        <div className="p-6 flex items-center space-x-3">
          <div className="w-10 h-10 bg-[#11B981] rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <span className="text-white font-bold text-xl">E</span>
          </div>
          <div>
            <h1 className="font-bold text-sm tracking-tight leading-none">Elevate NITC</h1>
            <p className="text-[10px] text-emerald-500 font-semibold uppercase tracking-wider mt-1">
              Admin Portal
            </p>
          </div>
        </div>

        <nav className="mt-4 px-3 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.name}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                item.active 
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                  : 'text-zinc-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon size={20} className={item.active ? 'text-emerald-400' : 'group-hover:text-white'} />
              <span className="text-sm font-medium">{item.name}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-emerald-900/30 bg-black/20">
        <div className="flex items-center justify-between group">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-zinc-800 border border-emerald-500/30 overflow-hidden flex items-center justify-center">
                <span className="text-xs text-emerald-400 font-medium">SK</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold truncate w-32">Prof. S. Kumar</span>
              <span className="text-[10px] text-zinc-500 uppercase">Senior Moderator</span>
            </div>
          </div>
          <button className="text-zinc-500 hover:text-red-400 transition-colors">
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
}