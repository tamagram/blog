import { NextPage } from "next";
import Image from "next/image";
import styles from "./about.module.scss";
import Layout from "../components/layout";
import Header from "../components/header";
import Footer from "../components/footer";

const About: NextPage = () => (
  <>
    <Layout>
      <Header path="/about" />
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
            <a href="https://github.com/tamagram">
              <Image
                src="/github-icon.svg"
                alt="github"
                width={40}
                height={40}
              />
            </a>
            <a href="https://twitter.com/tamagrm">
              <Image
                src="/twitter-icon.svg"
                alt="github"
                width={40}
                height={40}
              />
            </a>
            <a href="https://zenn.dev/tamagram">
              <Image src="/zenn-icon.svg" alt="github" width={40} height={40} />
            </a>
            <a href="https://tamagram.hatenablog.com/">
              <Image
                src="/hatena-icon.svg"
                alt="github"
                width={40}
                height={40}
              />
            </a>
          </div>
          <div className={styles.main__section__profiles__div}>
            <h2># Profile</h2>
            <p>
            Web開発やセキュリティに興味があって勉強しています<br/>
            ISC 情報セキュリティ学科 3年 <br/>
            <a href="https://isc-makeit.github.io/Make-IT-homepage/">MakeIT</a>と<a href="https://ipfactory.org/">IPFactory</a>に所属

            </p>
          </div>
        </section>
      </main>
      <Footer />
    </Layout>
  </>
);

export default About;
