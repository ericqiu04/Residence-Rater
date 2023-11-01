import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "@/components/navbar";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Navbar />
      <div className = "mt-32 px-10 bg-white">
        <Component {...pageProps} />
      </div>
    </div>
  );
}
