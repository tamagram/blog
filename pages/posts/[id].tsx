import axios from "axios";
import { JSDOM } from "jsdom";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

import POST from "../../entities/post";

const hatenaName = process.env.NEXT_PUBLIC_HATENA_NAME;
const hatenaPass = process.env.NEXT_PUBLIC_HATENA_PASS;

const Post: NextPage<POST> = (post) => {
  return (
    <>
      <p>{post.id}</p>
      <p>{post.title}</p>
      <p>{post.content}</p>
      <p>{post.link}</p>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
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
  const gotUpdated = gotEntry[0].getElementsByTagName("updated");
  const gotLink = gotEntry[0].getElementsByTagName("link");
  const post = {
    id: params.id as string,
    title: gotTitle[0].textContent,
    content: gotContent[0].textContent,
    published: gotPublished[0].textContent,
    updated: gotUpdated[0].textContent,
    tags: [],
    link: gotLink[1].getAttribute("href"),
  };
  // console.dir(post);
  return { props: post };
};

export default Post;
