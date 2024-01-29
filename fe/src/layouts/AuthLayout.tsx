import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<LayoutProps> = ({ children }) => {
  return children;
};

export default AuthLayout;
