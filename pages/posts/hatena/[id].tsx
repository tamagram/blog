import axios from "axios";
import { JSDOM } from "jsdom";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Footer from "../../../components/footer";
import Header from "../../../components/header";
import Layout from "../../../components/layout";
import styles from "./[id].module.css";
import POST from "../../../types/post";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import LINK from "../../../types/link";

const hatenaName = process.env.NEXT_PUBLIC_HATENA_NAME;
const hatenaPass = process.env.NEXT_PUBLIC_HATENA_PASS;
const hatenaUrl =
  "https://blog.hatena.ne.jp/tamagram/tamagram.hatenablog.com/atom/entry";
const hatenaAuthConfig = {
  auth: {
    username: hatenaName,
    password: hatenaPass,
  },
};

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
  const getXmlData = async (url: string, config: {} = {}) => {
    const jsdom = new JSDOM();
    const parser = new jsdom.window.DOMParser();
    const data = await axios.get(url, config).then((res) => res.data);
    const xmlData = parser.parseFromString(data, "text/xml");
    return xmlData;
  };

  const getHatenaLinks = async () => {
    const xmlData = await getXmlData(hatenaUrl, hatenaAuthConfig);
    const gotEntry = xmlData.getElementsByTagName("entry");
    const links: { id: string; title: string; number: string }[] = [];
    for (let i = 0; i < gotEntry.length; i++) {
      const gotId = gotEntry[i].getElementsByTagName("id");
      const gotTitle = gotEntry[i].getElementsByTagName("title");
      links.push({
        id: gotId[0].textContent,
        title: gotTitle[0].textContent,
        number: gotId[0].textContent.split("-").pop(),
      });
    }
    return links;
  };

  const links = await getHatenaLinks();
  const paths = links.map((link) => ({
    params: { id: link.number },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postNumber = params.id as string;
  const postLink =
    "https://blog.hatena.ne.jp/tamagram/tamagram.hatenablog.com/atom/entry/" +
    postNumber;
  const data = await axios
    .get(postLink, {
      auth: {
        username: hatenaName,
        password: hatenaPass,
      },
    })
    .then((res) => res.data);
  const jsdom = new JSDOM();
  const parser = new jsdom.window.DOMParser();
  const xmlData = parser.parseFromString(data, "text/xml");
  const gotEntry = xmlData.getElementsByTagName("entry");
  const gotId = gotEntry[0].getElementsByTagName("id");
  const gotTitle = gotEntry[0].getElementsByTagName("title");
  const gotContent = gotEntry[0].getElementsByTagName("content");
  const gotPublished = gotEntry[0].getElementsByTagName("published");
  const gotUpdated = gotEntry[0].getElementsByTagName("app:edited");
  const gotLink = gotEntry[0].getElementsByTagName("link");
  const post: POST = {
    id: params.id as string,
    title: gotTitle[0].textContent,
    content: gotContent[0].textContent,
    published: gotPublished[0].textContent,
    updated: gotUpdated[0].textContent,
    tags: [],
    link: gotLink[1].getAttribute("href"),
  };
  // console.dir(post);
  return { props: post, revalidate: 86400 };
};

export default Post;
