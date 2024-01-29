import React, { ReactNode, useEffect } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const NonHeaderLayout: React.FC<LayoutProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default NonHeaderLayout;
