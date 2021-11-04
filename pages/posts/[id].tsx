import { JSDOM } from "jsdom";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import path from "path";
import { getXmlDocument, getPostLinks, getPost } from "../../apis/hatena";

import POST from "../../entities/post";

const Post: NextPage<POST> = (post) => {
  return (
    <>
      <p>{post.id}</p>
      <p>{post.title}</p>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const document = await getXmlDocument(
    "https://blog.hatena.ne.jp/tamagram/tamagram.hatenablog.com/atom/entry"
  );
  const links = await getPostLinks(document);
  const paths = links.map((link) => ({
    params: { id: link.id },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postNumber = (params.id as string).split("-").pop();
  const postLink = path.join(
    "https://blog.hatena.ne.jp/tamagram/tamagram.hatenablog.com/atom/entry",
    postNumber
  );
  const document = await getXmlDocument(postLink);
  const post = await getPost(document);
  return { props: post };
};

export default Post;
