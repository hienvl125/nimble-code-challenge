import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Navbar from "./../components/navbar"

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  if (router.pathname === "/register" || router.pathname === "/login") {
    return <Component {...pageProps} />;
  }

  return (
    <main>
      <Navbar />
      <Component {...pageProps} />
    </main>
  );
}