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
        </section>
        <section className={styles.main__section__profiles}>
          <div className={styles.main__section__profiles__div}>
            <h2># Profile</h2>
            <p>
              **Name** <br />
              Masahiro Tajima <br />
              **Occupation** <br />
              Student <br />
              **Club** <br />
              IPFactory <br />
              MakeIT <br />
            </p>
            <h2># Interest</h2>
            <p>
              **WebDev** <br />
              React <br />
              **Cloud** <br />
              AWS <br />
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </Layout>
  </>
);

export default About;