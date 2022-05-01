import { XMLParser } from "fast-xml-parser";
import axios from "axios";
import POST from "../../../types/post";

const hatenaName = process.env.NEXT_PUBLIC_HATENA_NAME;
const hatenaPass = process.env.NEXT_PUBLIC_HATENA_PASS;

const hatenaUrl =
  "https://blog.hatena.ne.jp/tamagram/tamagram.hatenablog.com/atom/entry";

const getHatenaUrl = (date) => {
  const parsedDate = new Date(date);
  const year = parsedDate.getFullYear();
  const month =("0" + (parsedDate.getMonth() + 1)).slice(-2);
  const day = ("0" + parsedDate.getDate()).slice(-2);
  const hh = ("0" + parsedDate.getHours()).slice(-2);
  const mm = ("0" + parsedDate.getMinutes()).slice(-2);
  const ss = ("0" + parsedDate.getSeconds()).slice(-2);
  const dateStr = `${year}/${month}/${day}/${hh}${mm}${ss}`;
  return `https://tamagram.hatenablog.com/entry/${dateStr}`;
}

const handler = async (req, res) => {
  try {
    const { pid } = req.query;
    const getHatenaPost = async () => {
      const data = await axios
        .get(hatenaUrl + "/" + pid, {
          auth: {
            username: hatenaName,
            password: hatenaPass,
          },
        })
        .then((res) => res.data);
      const parser = new XMLParser();
      const jsonObj = parser.parse(data);
      console.log(jsonObj);
      const post: POST = {
        id: pid,
        title: jsonObj.entry.title,
        content: jsonObj.entry.content,
        published: jsonObj.entry.published,
        updated: jsonObj.entry.updated,
        tags: [],
        link: getHatenaUrl(jsonObj.entry.published),
      };
      return post;
    };
    const post = await getHatenaPost();
    res.statusCode = 200;
    console.log(post);
    res.json(post);
  } catch (e) {
    console.log(e);
    res.statusCode = 500;
  }
};

export default handler;
