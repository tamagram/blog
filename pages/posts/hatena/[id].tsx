import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Footer from "../../../components/footer";
import Header from "../../../components/header";
import Layout from "../../../components/layout";
import styles from "./[id].module.css";
import POST from "../../../types/post";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import LINK from "../../../types/link";
import axios from "axios";
import { XMLParser } from "fast-xml-parser";


const hatenaUrl =
  "https://blog.hatena.ne.jp/tamagram/tamagram.hatenablog.com/atom/entry";
const hatenaName = process.env.NEXT_PUBLIC_HATENA_NAME;
const hatenaPass = process.env.NEXT_PUBLIC_HATENA_PASS;

const Post: NextPage<POST> = (post) => {
  return (
    <Layout>
      <Header path="/blog" />
      <main className={styles.main}>
        <h1 className={styles.main__h1}>{post.title}</h1>
        <section className={styles.main__section_updates}>
          <span className={styles.main__section_updates__span}>
            <svg
              className={styles.main__section_updates__span__globe}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {post.published}
          </span>
          <span className={styles.main__section_updates__span}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={styles.main__section_updates__span__refresh}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            {post.updated}
          </span>
        </section>
        <section className={styles.main__section_markdown}>
          <ReactMarkdown className="markdown-body" remarkPlugins={[gfm]}>
            {post.content}
          </ReactMarkdown>
        </section>
        <div className={styles.main__div_postLink}>
          <a href={post.link}>{post.link}</a>
        </div>
      </main>
      <Footer />
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
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
  const links: LINK[] = await getHatenaLinks();
  const paths = links.map((link) => ({
    params: { id: link.id },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const pid = params.id as string;
  const getHatenaUrl = (date) => {
    const parsedDate = new Date(date);
    const year = parsedDate.getFullYear();
    const month = ("0" + (parsedDate.getMonth() + 1)).slice(-2);
    const day = ("0" + parsedDate.getDate()).slice(-2);
    const hh = ("0" + parsedDate.getHours()).slice(-2);
    const mm = ("0" + parsedDate.getMinutes()).slice(-2);
    const ss = ("0" + parsedDate.getSeconds()).slice(-2);
    const dateStr = `${year}/${month}/${day}/${hh}${mm}${ss}`;
    return `https://tamagram.hatenablog.com/entry/${dateStr}`;
  }
  const getHatenaPost = async () => {
    const data = await axios
      .get(hatenaUrl + "/" + pid, {
        auth: {
          username: hatenaName,
          password: hatenaPass,
        },
      })
      .then((res) => res.data);
    const parser = new XMLParser();
    const jsonObj = parser.parse(data);
    console.log(jsonObj);
    const post: POST = {
      id: pid,
      title: jsonObj.entry.title,
      content: jsonObj.entry.content,
      published: jsonObj.entry.published,
      updated: jsonObj.entry.updated,
      tags: [],
      link: getHatenaUrl(jsonObj.entry.published),
    };
    return post;
  };
  const post = await getHatenaPost();
  return { props: post, revalidate: 86400 };
};

export default Post;
