import { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import Layout from "../components/layout";
import Header from "../components/header";
import Footer from "../components/footer";
import styles from "./blog.module.css";
import axios from "axios";
import { JSDOM } from "jsdom";
import LINK from "../types/link";

type Props = {
  links: LINK[];
};

const hatenaName = process.env.NEXT_PUBLIC_HATENA_NAME;
const hatenaPass = process.env.NEXT_PUBLIC_HATENA_PASS;

const Blog: NextPage<Props> = ({ links }) => {
  const linksLi = () =>
    links.map((link) => (
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

export const getStaticProps: GetStaticProps = async () => {
  const getXmlData = async (url: string, config: {} = {}) => {
    const jsdom = new JSDOM();
    const parser = new jsdom.window.DOMParser();
    const data = await axios.get(url, config).then((res) => res.data);
    const xmlData = parser.parseFromString(data, "text/xml");
    return xmlData;
  };

  const getHatenaLinks = async () => {
    const xmlData = await getXmlData(
      "https://blog.hatena.ne.jp/tamagram/tamagram.hatenablog.com/atom/entry",
      {
        auth: {
          username: hatenaName,
          password: hatenaPass,
        },
      }
    );
    const gotEntry = xmlData.getElementsByTagName("entry");
    const links: LINK[] = [];
    for (let i = 0; i < gotEntry.length; i++) {
      const gotId = gotEntry[i].getElementsByTagName("id");
      const gotTitle = gotEntry[i].getElementsByTagName("title");
      links.push({
        id: gotId[0].textContent,
        title: gotTitle[0].textContent,
        local: "/posts/hatena/" + gotId[0].textContent.split("-").pop(),
        reference: "hatena",
      });
    }
    return links;
  };

  const getZennLinks = async () => {
    const xmlData = await getXmlData("https://zenn.dev/tamagram/feed");
    const gotItem = xmlData.getElementsByTagName("item");
    const links: LINK[] = [];
    for (let i = 0; i < gotItem.length; i++) {
      const gotId = gotItem[i].getElementsByTagName("guid");
      const gotTitle = gotItem[i].getElementsByTagName("title");
      links.push({
        id: gotId[0].textContent.split("/").pop(),
        title: gotTitle[0].textContent,
        local: "/posts/zenn/" + gotId[0].textContent.split("/").pop(),
        reference: "zenn",
      });
    }
    return links;
  };

  const links = [];
  links.push(...(await getHatenaLinks()));
  links.push(...(await getZennLinks()));
  // console.dir(links);
  return {
    props: {
      links,
    },
  };
};

export default Blog;
