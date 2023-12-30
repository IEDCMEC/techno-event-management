import React, { ReactNode } from 'react';
import Image from 'next/image';

import Menu from '@/components/Menu';
import Sidebar from '@/components/Sidebar';

const DashboardLayout = ({ children }) => {
  return (
    <>
      <div className="hidden md:block">
        <Menu />
        <div className="border-t">
          <div className="bg-background">
            <div className="grid lg:grid-cols-5">
              <Sidebar />
              <div className="col-span-3 lg:col-span-4 lg:border-l">
                <div className="h-full px-4 py-6 lg:px-8">{children}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
