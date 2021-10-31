import Head from "next/head";
import styles from "./layout.module.css"
const Layout: React.FC = ({ children }) => (
  <div className={styles.layout}>
    <Head>
      <title>tama</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    {children}
  </div>
);

export default Layout;
