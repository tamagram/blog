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
    const response = await fetch("http://localhost:3000/api/hatena/links")
    return response.json();
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
  const response = await fetch("http://localhost:3000/api/hatena/" + params.id);
  const post: POST = await response.json();
  return { props: post, revalidate: 86400 };
};

export default Post;
