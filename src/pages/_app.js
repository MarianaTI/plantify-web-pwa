import usePullToRefresh from "@/components/PullRefresh";
import { PageContentProvider } from "@/context/PageContentContext";
import ResponsiveDrawer from "@/layout";
import "@/styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  usePullToRefresh();

  return (
    <PageContentProvider>
      <Head>
        <title>Plantify Web App</title>
        <meta name="description" content="Plantify PWA" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#fff" />
        <link rel="apple-touch-icon" href="/icon512_rounded.png" />
      </Head>
      <ResponsiveDrawer>
        <Component {...pageProps} />
      </ResponsiveDrawer>
    </PageContentProvider>
  );
}
