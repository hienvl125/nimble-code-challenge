import { createContext, useContext, useState, ReactNode } from 'react';

type FlashMessageType = 'success' | 'error';

type FlashMessage = {
  messageType: FlashMessageType;
  messageContent: string;
}

type FlashMessageParams = {
  messageType: FlashMessageType;
  messageContent: string;
}

type FlashMessagesContextProps = {
  flashMessage: FlashMessage | null;
  setFlashMessage: (message: FlashMessageParams | null) => void;
}

const FlashMessagesContext = createContext<FlashMessagesContextProps | undefined>(undefined);

export const FlashMessagesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [flashMessage, setFlashMessage] = useState<FlashMessage | null>(null);

  const setFlash = (message: FlashMessageParams | null) => {
    if (message) {
      setFlashMessage({ ...message });
      setTimeout(() => setFlashMessage(null), 5000); // Clear the flash message after 5 seconds
    } else {
      setFlashMessage(null);
    }
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
