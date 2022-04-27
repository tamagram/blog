import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import Layout from "../components/layout";
import Header from "../components/header";
import Footer from "../components/footer";
import styles from "./blog.module.css";
import LINK from "../types/link";
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json())

const Blog: NextPage = () => {
  const { data, error } = useSWR<LINK[]>(
    "api/hatena",
    fetcher
  );

  const linksLi = () =>
    data.map((link) => (
      <li key={link.id} className={styles.main__ul__li}>
        <Link href={link.local}>
          <a>
            <article className={styles.main__ul__li__article}>
              <div className={styles.main__ul__li__article__div}>
                <Image
                  src={"/" + link.reference + "-icon.svg"}
                  alt="icon"
                  width={90}
                  height={90}
                />
              </div>
              <h2 className={styles.main__ul__li__article__h2}>{link.title}</h2>
            </article>
          </a>
        </Link>
      </li>
    ));
  if (error) return (
    <Layout>
      <Header path="/blog" />
      <main className={styles.main}>
        <h1 className={styles.main__heading_1}>Posts</h1>
        An error has occurred.
      </main>
      <Footer />
    </Layout>
  );
  if (!data) return (
    <Layout>
      <Header path="/blog" />
      <main className={styles.main}>
        <h1 className={styles.main__heading_1}>Posts</h1>
        Loading...
      </main>
      <Footer />
    </Layout>
  );
  return (
    <Layout>
      <Header path="/blog" />
      <main className={styles.main}>
        <h1 className={styles.main__heading_1}>Posts</h1>
        <ul>{linksLi()}</ul>
      </main>
      <Footer />
    </Layout>
  );
};


export default Blog;
