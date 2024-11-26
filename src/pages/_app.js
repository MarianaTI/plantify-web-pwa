import usePullToRefresh from "@/components/PullRefresh";
import { PageContentProvider } from "@/context/PageContentContext";
import ResponsiveDrawer from "@/layout";
import "@/styles/globals.css";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar
            closeOnClick
            newestOnTop
            style={{ fontSize: "14px", fontFamily: "Poppins" }}
          />
      </ResponsiveDrawer>
    </PageContentProvider>
  );
}
