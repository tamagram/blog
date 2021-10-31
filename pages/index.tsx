import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import styles from "./index.module.css";
import Layout from "../components/layout";

const Home: NextPage = () => (
  <Layout>
    <header className={styles.header}>
      <nav className={styles.header__nav}>
        <li className={styles.header__nav__li}>
          <Link href="/">
            <a className={styles.header__nav__li__selected_a}>About</a>
          </Link>
        </li>
        <li className={styles.header__nav__li}>
          <Link href="/blog">
            <a className={styles.header__nav__li__a}>Blog</a>
          </Link>
        </li>
        <li className={styles.header__nav__li}>
          <Link href="/portfolio">
            <a className={styles.header__nav__li__a}>Portfolio</a>
          </Link>
        </li>
      </nav>
    </header>
    <main className={styles.main}>
      <section className={styles.main__section__avatars}>
        <div>
          <Image
            className={styles.main__section__avatar_img}
            src="/tamagram.jpg"
            alt="tamagram"
            width={200}
            height={200}
          />
        </div>
        <div className={styles.main__section__avatar_name}>tama</div>
        <div className={styles.main__section__icons}>
          <Image src="/github-icon.svg" alt="github" width={40} height={40} />
          <Image src="/twitter-icon.svg" alt="github" width={40} height={40} />
          <Image src="/rss-icon.svg" alt="github" width={40} height={40} />
        </div>
      </section>
      <section className={styles.main__section__profiles}>
        <div className={styles.main__section__profiles__div}>
          <h2># Profile</h2>
          <p>
            Name: Masahiro Tajima <br />
            Occupation: Student <br />
            Circle: <br />
            - IPFactory <br />
            - MakeIT <br />
          </p>
          <h2># Interest</h2>
          <p>
            WebDev: React <br />
            Cloud: AWS <br />
          </p>
        </div>
      </section>
    </main>
    <footer className={styles.footer}>&copy; tamagram 2021</footer>
  </Layout>
);

export default Home;
