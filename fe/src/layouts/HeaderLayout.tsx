import React, { ReactNode } from 'react';
import Navbar from '@/components/HeaderBar';

interface LayoutProps {
  children: ReactNode;
}

const HeaderLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default HeaderLayout;
