import axios from "axios";
import { JSDOM } from "jsdom";
import POST from "../entities/post";
require("dotenv").config();

const hatenaName = process.env.HATENA_NAME;
const hatenaPass = process.env.HATENA_PASS;

export const getXmlDocument = async () => {
  const data = await (async () => {
    return await axios
      .get(
        "https://blog.hatena.ne.jp/tamagram/tamagram.hatenablog.com/atom/entry",
        {
          auth: {
            username: hatenaName,
            password: hatenaPass,
          },
        }
      )
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => console.error(err));
  })();
  const jsdom = new JSDOM();
  const parser = new jsdom.window.DOMParser();
  const xmlData = parser.parseFromString(data, "text/xml");
  return xmlData;
};

export const getPosts = (document: Document): POST[] => {
  const gotEntry = document.getElementsByTagName("entry");
  const posts = [];
  for (let i = 0; i < gotEntry.length; i++) {
    const gotId = gotEntry[i].getElementsByTagName("id");
    const gotTitle = gotEntry[i].getElementsByTagName("title");
    const gotContent = gotEntry[i].getElementsByTagName("content");
    const gotPublished = gotEntry[i].getElementsByTagName("published");
    const gotUpdated = gotEntry[i].getElementsByTagName("updated");
    const gotLink = gotEntry[i].getElementsByTagName("link");
    const post: POST = {
      id: gotId[0].textContent,
      title: gotTitle[0].textContent,
      content: gotContent[0].textContent,
      published: new Date(gotPublished[0].textContent),
      updated: new Date(gotUpdated[0].textContent),
      tags: [],
      link: gotLink[1].getAttribute("href"),
    };
    posts.push(post);
  }
  return posts;
};

export const getPost = (document: Document): POST => {
  const gotEntry = document.getElementsByTagName("entry");
  const gotId = gotEntry[0].getElementsByTagName("id");
  const gotTitle = gotEntry[0].getElementsByTagName("title");
  const gotContent = gotEntry[0].getElementsByTagName("content");
  const gotPublished = gotEntry[0].getElementsByTagName("published");
  const gotUpdated = gotEntry[0].getElementsByTagName("updated");
  const gotLink = gotEntry[0].getElementsByTagName("link");
  const post: POST = {
    id: gotId[0].textContent,
    title: gotTitle[0].textContent,
    content: gotContent[0].textContent,
    published: new Date(gotPublished[0].textContent),
    updated: new Date(gotUpdated[0].textContent),
    tags: [],
    link: gotLink[1].getAttribute("href"),
  };
  return post;
};
