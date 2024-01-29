import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react"
import { FlashMessagesProvider } from '@/context/FlashMessageContext';
import AuthLayout from "@/layouts/AuthLayout";
import StandardLayout from "@/layouts/StandardLayout";


export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const queryClient = new QueryClient()
  const router = useRouter();

  if (router.pathname === "/register" || router.pathname === "/login") {
    return (
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <FlashMessagesProvider>
            <AuthLayout>
              <Component {...pageProps} />
            </AuthLayout>
          </FlashMessagesProvider>
        </QueryClientProvider>
      </SessionProvider>
    );
  }

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <FlashMessagesProvider>
          <StandardLayout>
            <Component {...pageProps} />
          </StandardLayout>
        </FlashMessagesProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
