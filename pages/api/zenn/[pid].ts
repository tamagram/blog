import axios from "axios";
import { JSDOM } from "jsdom";
import POST from "../../../types/post";
import TurndownService from "turndown";

const zennArticleUrlPrefix = "https://zenn.dev/tamagram/articles/";
const turndownService = new TurndownService();

const handler = async (req, res) => {
  try {
    const { pid } = req.query;
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

    res.statusCode = 200;
    res.json(post);
  } catch (e) {
    console.log(e);
    res.statusCode = 500;
  }
};

export default handler;
