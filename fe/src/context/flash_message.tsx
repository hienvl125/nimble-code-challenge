import { createContext, useContext, useState, ReactNode } from 'react';

type FlashMessageType = 'success' | 'error' | 'warning';

interface FlashMessage {
  messageType: FlashMessageType;
  messageContent: string;
}

interface FlashMessagesContextProps {
  flashMessage: FlashMessage | null;
  setFlashMessage: (messageType: FlashMessageType, messageContent: string) => void;
}

const FlashMessagesContext = createContext<FlashMessagesContextProps | undefined>(undefined);

export const FlashMessagesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [flashMessage, setFlashMessage] = useState<FlashMessage | null>(null);

  const setFlash = (messageType: FlashMessageType, messageContent: string) => {
    setFlashMessage({ messageType, messageContent });
    setTimeout(() => setFlashMessage(null), 5000); // Clear the flash message after 5 seconds
  };

  return (
    <FlashMessagesContext.Provider value={{ flashMessage, setFlashMessage: setFlash }}>
      {children}
    </FlashMessagesContext.Provider>
  );
};

export const useFlashMessage = (): FlashMessagesContextProps => {
  const context = useContext(FlashMessagesContext);
  if (!context) {
    throw new Error('useFlashMessage must be used within a FlashMessagesProvider');
  }
  return context;
};
