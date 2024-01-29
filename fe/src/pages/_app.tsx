import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react"
import NonHeaderLayout from "@/layouts/NonHeaderLayout";
import HeaderLayout from "@/layouts/HeaderLayout";


export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const queryClient = new QueryClient()
  const router = useRouter();

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>

        {
          (router.pathname === "/register" || router.pathname === "/login") ?
            (
              <NonHeaderLayout>
                <Component {...pageProps} />
              </NonHeaderLayout>
            ) : (
              <HeaderLayout>
                <Component {...pageProps} />
              </HeaderLayout>
            )
        }
      </QueryClientProvider>
    </SessionProvider>
  );
}

