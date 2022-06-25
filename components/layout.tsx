import Head from "next/head";
import styles from "./layout.module.scss";
const Layout: React.FC = ({ children }) => (
  <div className={styles.layout}>
    <Head>
      <title>tama</title>
      <link rel="icon" href="/favicons/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:url" content="http://blog-tamagram.vercel.app/"></meta>
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
  </div>
);

export default Layout;
