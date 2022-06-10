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
import TurndownService from "turndown";
import { JSDOM } from "jsdom";
import { XMLParser } from "fast-xml-parser";

const zennArticleUrlPrefix = "https://zenn.dev/tamagram/articles/";
const turndownService = new TurndownService();

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
  const links = await getZennLinks();
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
  const getHtmlData = async (url: string, config: {} = {}) => {
    const jsdom = new JSDOM();
    const parser = new jsdom.window.DOMParser();
    const data = await axios.get(url, config).then((res) => res.data);
    const htmlData = parser.parseFromString(data, "text/html");
    return htmlData;
  };

  const getZennPost = async () => {
    const zennPostLink = zennArticleUrlPrefix + pid;
    const htmlData = getHtmlData(zennPostLink);
    const gotNextData = (await htmlData).getElementById("__NEXT_DATA__");
    const nextData = JSON.parse(gotNextData.textContent);

    const gotId = nextData.props.pageProps.article.id;
    const gotTitle = nextData.props.pageProps.article.title;
    const gotBodyHtml = nextData.props.pageProps.article.bodyHtml;
    const gotPublished = nextData.props.pageProps.article.publishedAt;
    const gotUpdated = nextData.props.pageProps.article.updatedAt;
    const post: POST = {
      id: gotId,
      title: gotTitle,
      content: turndownService.turndown(gotBodyHtml),
      published: gotPublished,
      updated: gotUpdated || gotPublished,
      tags: [],
      link: "https://zenn.dev/tamagram/articles/" + pid,
    };
    return post;
  };
  const post = await getZennPost();
  return { props: post, revalidate: 86400 };
};

export default Post;
