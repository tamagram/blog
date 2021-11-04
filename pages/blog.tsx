import { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import Layout from "../components/layout";
import Header from "../components/header";
import Footer from "../components/footer";
import styles from "./blog.module.css";
import axios from "axios";
import { JSDOM } from "jsdom";

type Props = {
  links: { id: string; title: string }[];
};

export const hatenaName = process.env.NEXT_PUBLIC_HATENA_NAME;
export const hatenaPass = process.env.NEXT_PUBLIC_HATENA_PASS;

const Blog: NextPage<Props> = ({ links }) => {
  const linksLi = () =>
    links.map((link) => (
      <li key={link.id} className={styles.main__ul__li}>
        <article className={styles.main__ul__li__article}>
          <div className={styles.main__ul__li__article__div}>
            <Image src="/120x120.png" alt="placehold" width={90} height={90} />
          </div>
          <h2 className={styles.main__ul__li__article__h2}>{link.title}</h2>
        </article>
      </li>
    ));
  return (
    <Layout>
      <Header path="/blog" />
      <main className={styles.main}>
        <h1 className={styles.main__heading_1}>Posts</h1>
        <ul>
          {linksLi()}
          <li className={styles.main__ul__li}>
            <article className={styles.main__ul__li__article}>
              <div className={styles.main__ul__li__article__div}>
                <Image
                  src="/120x120.png"
                  alt="placehold"
                  width={90}
                  height={90}
                />
              </div>
              <h2 className={styles.main__ul__li__article__h2}>
                titlessssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
              </h2>
            </article>
          </li>
        </ul>
      </main>
      <Footer />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const data = await axios
    .get(
      "https://blog.hatena.ne.jp/tamagram/tamagram.hatenablog.com/atom/entry",
      {
        auth: {
          username: hatenaName,
          password: hatenaPass,
        },
      }
    )
    .then((res) => res.data);
  const jsdom = new JSDOM();
  const parser = new jsdom.window.DOMParser();
  const xmlData = parser.parseFromString(data, "text/xml");
  const gotEntry = xmlData.getElementsByTagName("entry");
  const links: { id: string; title: string }[] = [];
  for (let i = 0; i < gotEntry.length; i++) {
    const gotId = gotEntry[i].getElementsByTagName("id");
    const gotTitle = gotEntry[i].getElementsByTagName("title");
    links.push({
      id: gotId[0].textContent,
      title: gotTitle[0].textContent,
    });
  }
  return {
    props: {
      links,
    },
  };
};

export default Blog;
