import usePullToRefresh from "@/components/PullRefresh";
import { PageContentProvider } from "@/context/PageContentContext";
import ResponsiveDrawer from "@/layout";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  usePullToRefresh();
  return  (
    <PageContentProvider>
      <ResponsiveDrawer>
        <Component {...pageProps} />
      </ResponsiveDrawer>
    </PageContentProvider>
  );
}
