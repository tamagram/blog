import axios from "axios";
import { XMLParser } from "fast-xml-parser";
import LINK from "../../../types/link";

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
    res.statusCode = 200;
    const links = await getHatenaLinks();
    res.json(links);
  } catch (e) {
    console.log(e);
    res.statusCode = 500;
  }
};

export default handler;
