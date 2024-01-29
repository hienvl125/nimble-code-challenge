import React, { ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import AlreadyLoggedInBox from '@/components/AlreadyLoggedInBox';


interface LayoutProps {
  children: ReactNode;
}

const NonHeaderLayout: React.FC<LayoutProps> = ({ children }) => {
  const { status: sessionStatus } = useSession();

  if (sessionStatus === "authenticated") {
    return <AlreadyLoggedInBox />
  }

  return <div>{children}</div>;
};

export default NonHeaderLayout;
