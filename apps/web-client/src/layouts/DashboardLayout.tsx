import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import Navigator from '@/components/Navigator';
import React, { ReactNode } from 'react';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="h-screen w-screen flex flex-col">
      <Navbar />
      <div className="h-full w-full flex flex-row justify-between items-center">
        <Sidebar />
        <div className="h-full w-full">{children}</div>
      </div>
    </main>
  );
};

export default DashboardLayout;
