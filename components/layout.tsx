import Head from "next/head";
import styles from "./layout.module.scss";

import Script from "next/script";
import { useRouter } from "next/router";
import { useEffect } from "react";
import * as gtag from "../lib/gtag";
// This default export is required in a new `pages/_app.js` file.
const Layout: React.FC = ({ children }) => {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageView(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    router.events.on("hashChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      router.events.off("hashChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  return (
    <div className={styles.layout}>
      <Head>
        <title>tama</title>
        <link rel="icon" href="/favicons/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          property="og:url"
          content="http://blog-tamagram.vercel.app/"
        ></meta>
        <meta property="og:site_name" content="Zoneの白が飲みたい"></meta>
        <meta property="og:title" content="tama"></meta>
        <meta property="og:description" content="ブログとかの寄せ集め"></meta>
        <meta property="og:image" content="/tamagram.jpg"></meta>
        <meta property="og:image:width" content="90"></meta>
        <meta property="og:image:height" content="90"></meta>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="canonical" href="http://blog-tamagram.vercel.app/" />
      </Head>
      {children}
      {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${
          process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? ""
        }`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'GA_MEASUREMENT_ID');
        `}
      </Script>
    </div>
  );
};

export default Layout;
