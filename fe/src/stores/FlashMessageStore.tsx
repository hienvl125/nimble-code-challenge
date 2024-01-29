import { create } from 'zustand';
type FlashMessageType = "success" | "error";

type FlashMessage = {
  flashMessageType: FlashMessageType;
  flashMessageContent: string;
}

interface FlashMessageState {
  flashMessage: FlashMessage | null;
  setFlashMessage: (newFlashMessage: FlashMessage | null) => void
}

export const useFlashMessageStore = create<FlashMessageState>(
  (set) => ({
    flashMessage: null,
    setFlashMessage: (newFlashMessage) => {
      set({ flashMessage: newFlashMessage });
    }
  })
);

