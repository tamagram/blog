import Head from "next/head";
import styles from "./layout.module.css"
const Layout: React.FC = ({ children }) => (
  <div className={styles.layout}>
    <Head>
      <title>tama</title>
      <link rel="icon" href="/favicons/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    {children}
  </div>
);


export default Layout;
