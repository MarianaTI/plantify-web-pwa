import { PageContentProvider } from "@/context/PageContentContext";
import ResponsiveDrawer from "@/layout";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return  (
    <PageContentProvider>
      <ResponsiveDrawer>
        <Component {...pageProps} />
      </ResponsiveDrawer>
    </PageContentProvider>
  );
}
