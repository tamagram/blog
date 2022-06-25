import { NextPage, GetStaticProps } from "next";
import Layout from "../components/layout";
import Header from "../components/header";
import Footer from "../components/footer";
import styles from "./index.module.scss";
import Image from "next/image";
import Link from "next/link";
import LINK from "../types/link";
import axios from "axios";
import { XMLParser } from "fast-xml-parser";

import TurndownService from "turndown";

const hatenaUrl =
  "https://blog.hatena.ne.jp/tamagram/tamagram.hatenablog.com/atom/entry";
const hatenaName = process.env.NEXT_PUBLIC_HATENA_NAME;
const hatenaPass = process.env.NEXT_PUBLIC_HATENA_PASS;
const zennArticleUrlPrefix = "https://zenn.dev/tamagram/articles/";
const turndownService = new TurndownService();
const fetcher = (url: string) => fetch(url).then((res) => res.json());

type PROPS = {
  links: { [year: string]: LINK[] };
};

const Timeline: NextPage<PROPS> = (props) => {
  const linksLi = (links: LINK[]) =>
    links.map((link) => (
      <li key={link.id} className={styles.container__item}>
        <div className={styles.container__top}>
          <div className={styles.container__circle}></div>
          <div className={styles.container__title}>
            Published on {link.createdAt}
          </div>
        </div>
        <Link href={link.local}>
          <a>
            <div className={styles.container__desc}>
              <div className={styles.container__desc__img}>
                <Image
                  src={`/${link.reference}-icon.svg`}
                  alt="icon"
                  width={36}
                  height={36}
                />
              </div>
              {link.title}
            </div>
          </a>
        </Link>
      </li>
    ));
  const yearUl = () => {
    const links = Object.entries(props.links).sort(
      (a, b) => Number(b[0]) - Number(a[0])
    );
    return links.map(
      ([year, links]) =>
        links.length !== 0 && (
          <>
            <div className={styles.year}>{year}</div>
            <div className={styles.container}>
              <div className={styles.container__line}></div>
              <ul className={styles.container__items}>{linksLi(links)}</ul>
            </div>
          </>
        )
    );
  };

  return (
    <Layout>
      <Header path="/"></Header>
      <main className={styles.main}>
        <div>
          {yearUl()}
          {
            // <div className={styles.year}>2022</div>
            // <div className={styles.container}>
            //   <div className={styles.container__line}></div>
            //   <ul className={styles.container__items}>
            //     <li className={styles.container__item}>
            //       <div className={styles.container__top}>
            //         <div className={styles.container__circle}></div>
            //         <div className={styles.container__title}>
            //           Published on 2022-01-07T00:25:56+09:00
            //         </div>
            //       </div>
            //       <div className={styles.container__desc}>description</div>
            //     </li>
            //   </ul>
            // </div>
          }
        </div>
      </main>
      <Footer />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const getZennLinks = async () => {
    const links: LINK[] = [];
    const getXmlData = async (url: string, config: {} = {}) => {
      const data = await axios.get(url, config).then((res) => res.data);
      return data;
    };
    const parser = new XMLParser();
    const xmlData = await getXmlData("https://zenn.dev/tamagram/feed");
    const jsonObj = parser.parse(xmlData);
    const items = jsonObj.rss.channel.item;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const link: LINK = {
        id: item.guid.split("/").pop(),
        title: item.title,
        local: "/posts/zenn/" + item.guid.split("/").pop(),
        reference: "zenn",
        createdAt: new Date(item.pubDate),
      };
      links.push(link);
    }
    return links;
  };
  const getHatenaLinks = async () => {
    const links: LINK[] = [];
    const getXmlData = async (url: string, config: {} = {}) => {
      const data = await axios.get(url, config).then((res) => res.data);
      return data;
    };
    const parser = new XMLParser();
    const xmlData = await getXmlData(
      "https://blog.hatena.ne.jp/tamagram/tamagram.hatenablog.com/atom/entry",
      {
        auth: {
          username: hatenaName,
          password: hatenaPass,
        },
      }
    );
    const jsonObj = parser.parse(xmlData);
    const entries = jsonObj.feed.entry;
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      const link: LINK = {
        id: entry.id.split("-").pop(),
        title: entry.title,
        local: "/posts/hatena/" + entry.id.split("-").pop(),
        reference: "hatena",
        createdAt: new Date(entry.published),
      };
      links.push(link);
    }
    return links;
  };
  let links = await getZennLinks();
  links = links.concat(await getHatenaLinks());
  links = JSON.parse(JSON.stringify(links));
  links.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  // console.log(links);
  let yearLinks = {};
  for (const link of links) {
    let year = new Date(link.createdAt).getFullYear();
    if (year in yearLinks) {
      yearLinks[year].push(link);
    } else {
      yearLinks[year] = [link];
    }
  }
  return {
    props: {
      links: yearLinks,
    },
    revalidate: 86400,
  };
};

export default Timeline;
