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
                src="/products/porta.png"
                alt="placehold"
                width={640}
                height={360}
              />
              <h2 className={styles.main__ul__li__article__h2}>WIP🚧 PORTA</h2>
              <p className={styles.main__ul__li__article__p}>
                クリエイターのためのオンラインポートフォリオ作成サービス
                <br />
                MakeIT 部内ハッカソン
              </p>
            </div>
          </article>
        </li>
        <li className={styles.main__ul__li}>
          <article className={styles.main__ul__li__article}>
            <div className={styles.main__ul__li__article__div}>
              <Image
                className={styles.main__ul__li__article__div__img}
                src="/products/custom-songs.png"
                alt="placehold"
                width={600}
                height={397}
              />
              <h2 className={styles.main__ul__li__article__h2}>
                WIP🚧 custom-songs
              </h2>
              <p className={styles.main__ul__li__article__p}>
                BeatSaberのカスタム曲を管理するネイティブアプリケーション
                Electronにて開発中
              </p>
              <a href="https://github.com/tamagram/custom-songs">
                https://github.com/tamagram/custom-songs
              </a>
            </div>
          </article>
        </li>
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
                <br />
                学生ITコンテスト2021 最優秀賞作品
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
