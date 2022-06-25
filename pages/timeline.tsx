import { NextPage } from "next";
import Layout from "../components/layout";
import Header from "../components/header";
import Footer from "../components/footer";
import styles from "./timeline.module.scss";
const Timeline: NextPage = () => {
  return (
    <Layout>
      <Header path="/timeline"></Header>
      <main className={styles.main}>
        <div>
          <div className={styles.year}>2022</div>
          <div className={styles.container}>
            <div className={styles.container__line}></div>
            <ul className={styles.container__items}>
              <li className={styles.container__item}>
                <div className={styles.container__top}>
                  <div className={styles.container__circle}></div>
                  <div className={styles.container__title}>
                    Published on 2022-01-07T00:25:56+09:00
                  </div>
                </div>
                <div className={styles.container__desc}>description</div>
              </li>

              <li className={styles.container__item}>
                <div className={styles.container__top}>
                  <div className={styles.container__circle}></div>
                  <div className={styles.container__title}>
                    Published on 2022-01-07T00:25:56+09:00
                  </div>
                </div>
                <div className={styles.container__desc}>description</div>
              </li>
              <li className={styles.container__item}>
                <div className={styles.container__top}>
                  <div className={styles.container__circle}></div>
                  <div className={styles.container__title}>
                    Published on 2022-01-07T00:25:56+09:00
                  </div>
                </div>
                <div className={styles.container__desc}>description</div>
              </li>
            </ul>
          </div>
          <div className={styles.year}>2021</div>
          <div className={styles.container}>
            <div className={styles.container__line}></div>
            <ul className={styles.container__items}>
              <li className={styles.container__item}>
                <div className={styles.container__top}>
                  <div className={styles.container__circle}></div>
                  <div className={styles.container__title}>
                    Published on 2022-01-07T00:25:56+09:00
                  </div>
                </div>
                <div className={styles.container__desc}>description</div>
              </li>

              <li className={styles.container__item}>
                <div className={styles.container__top}>
                  <div className={styles.container__circle}></div>
                  <div className={styles.container__title}>
                    Published on 2022-01-07T00:25:56+09:00
                  </div>
                </div>
                <div className={styles.container__desc}>description</div>
              </li>
              <li className={styles.container__item}>
                <div className={styles.container__top}>
                  <div className={styles.container__circle}></div>
                  <div className={styles.container__title}>
                    Published on 2022-01-07T00:25:56+09:00
                  </div>
                </div>
                <div className={styles.container__desc}>description</div>
              </li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </Layout>
  );
};
export default Timeline;
