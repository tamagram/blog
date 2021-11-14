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
      <h1 className={styles.main__h1}>Products</h1>
      <ul>
        <li className={styles.main__ul__li}>
          <article className={styles.main__ul__li__article}>
            <div className={styles.main__ul__li__article__div}>
              <Image
                className={styles.main__ul__li__article__div__img}
                src="/products/coreque.png"
                alt="placehold"
                width={360}
                height={640}
              />
              <h2 className={styles.main__ul__li__article__h2}>CoreQue</h2>
              <p className={styles.main__ul__li__article__p}>
                コンビニ商品に焦点をあてた健康管理アプリケーションをサークルのメンバーと共同で開発しました
              </p>
              <a href="https://coreque.herokuapp.com/home">
                https://coreque.herokuapp.com/home
              </a>
            </div>
          </article>
        </li>
      </ul>
    </main>
    <Footer />
  </Layout>
);

export default Portfolio;
