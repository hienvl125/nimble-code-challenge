import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FlashMessagesProvider } from '../context/flash_message';
import Navbar from "./../components/navbar";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()
  const router = useRouter();

  if (router.pathname === "/register" || router.pathname === "/login") {
    return (
      <QueryClientProvider client={queryClient}>
        <FlashMessagesProvider>
          <Component {...pageProps} />
        </FlashMessagesProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <FlashMessagesProvider>
        <Navbar />
        <Component {...pageProps} />
      </FlashMessagesProvider>
    </QueryClientProvider>
  );
}
