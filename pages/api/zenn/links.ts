import axios from "axios";
import { XMLParser } from "fast-xml-parser";
import LINK from "../../../types/link";

const handler = async (req, res) => {
  try {
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
    console.log(links);
    res.statusCode = 200;
    res.json(links);
  } catch (e) {
    console.log(e);
    res.statusCode = 500;
  }
};

export default handler;
