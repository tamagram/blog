import { XMLParser } from "fast-xml-parser";
import axios from "axios";
import LINK from "../../types/link";

const hatenaName = process.env.NEXT_PUBLIC_HATENA_NAME;
const hatenaPass = process.env.NEXT_PUBLIC_HATENA_PASS;

const handler = async (req, res) => {
  try {
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
          id: entry.id,
          title: entry.title,
          local: "/posts/hatena/" + entry.id.split("-").pop(),
          reference: "hatena",
          createdAt: new Date(entry.published),
        };
        links.push(link);
      }
      return links;
    };
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
      // return jsonObj;
      // console.log(jsonObj);
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
    // res.status(200).json(await getHatenaLinks());
    const links: LINK[] = [];
    links.push(...(await getHatenaLinks()));
    links.push(...(await getZennLinks()));
    links.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    res.status(200).json(links);
  } catch (e) {
    console.log(e);
    res.statusCode = 500;
  }
};

export default handler;
