import React, { ReactNode } from 'react';
import Navbar from '@/components/Navbar';

interface LayoutProps {
  children: ReactNode;
}

const StandardLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default StandardLayout;
