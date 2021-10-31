import Head from "next/head";
const Layout: React.FC = ({ children }) => (
  <div>
    <Head>
      <title>tama</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    {children}
  </div>
);

export default Layout;
