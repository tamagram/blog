import { NextPage } from "next";
import Image from "next/image";
import styles from "./index.module.css";
import Layout from "../components/layout";
import Header from "../components/header";
import Footer from "../components/footer";

const Home: NextPage = () => (
  <Layout>
    <Header path="/" />
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
    <Footer />
  </Layout>
);

export default Home;
