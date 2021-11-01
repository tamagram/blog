import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import Layout from "../components/layout";
import Header from "../components/header";
import Footer from "../components/footer";
import styles from "./portfolio.module.css";

const Portfolio: NextPage = () => (
  <Layout>
    <Header path="/portfolio" />
    <main className={styles.main}>
      <h1 className={styles.main__heading_1}>Projects</h1>
      <ul>
        <li className={styles.main__ul__li}>
          <article className={styles.main__ul__li__article}>
            <h2 className={styles.main__ul__li__article__h2}>
              titlessssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
            </h2>
            <div className={styles.main__ul__li__article__div}>
              <Image
                src="/120x120.png"
                alt="placehold"
                width={90}
                height={90}
              />
            </div>
          </article>
        </li>
        <li className={styles.main__ul__li}>
          <article className={styles.main__ul__li__article}>
            <h2 className={styles.main__ul__li__article__h2}>
              titlessssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
            </h2>
            <div className={styles.main__ul__li__article__div}>
              <Image
                src="/120x120.png"
                alt="placehold"
                width={90}
                height={90}
              />
            </div>
          </article>
        </li>
        <li className={styles.main__ul__li}>
          <article className={styles.main__ul__li__article}>
            <h2 className={styles.main__ul__li__article__h2}>
              titlessssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
            </h2>
            <div className={styles.main__ul__li__article__div}>
              <Image
                src="/120x120.png"
                alt="placehold"
                width={90}
                height={90}
              />
            </div>
          </article>
        </li>
        <li className={styles.main__ul__li}>
          <article className={styles.main__ul__li__article}>
            <h2 className={styles.main__ul__li__article__h2}>
              titlessssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
            </h2>
            <div className={styles.main__ul__li__article__div}>
              <Image
                src="/120x120.png"
                alt="placehold"
                width={90}
                height={90}
              />
            </div>
          </article>
        </li>
      </ul>
    </main>
    <Footer />
  </Layout>
);

export default Portfolio;
