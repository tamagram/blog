import axios from "axios";
import { JSDOM } from "jsdom";
require("dotenv").config();

const hatenaName = process.env.HATENA_NAME;
const hatenaPass = process.env.HATENA_PASS;

const getXmlDocument = async () => {
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

const getPosts = (document: Document) => {
  
}

export default getXmlDocument;
