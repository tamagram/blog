import { JSDOM } from "jsdom";
import { getXmlDocument, getPosts } from "../../apis/hatena";
import POST from "../../entities/post";

describe("test getXmlDocument", () => {
  test("fetch document", async () => {
    const want = "object";
    const got = await getXmlDocument();
    expect(typeof got === want).toBeTruthy();
  });
});

describe("test getPosts", () => {
  test("Takes a document and returns the post data", () => {
    const strXml = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom"
      xmlns:app="http://www.w3.org/2007/app">

  <link rel="first" href="https://blog.hatena.ne.jp/tamagram/tamagram.hatenablog.com/atom/entry" />

  

  <title>tamagram’s diary</title>
  
  <link rel="alternate" href="https://tamagram.hatenablog.com/"/>
  <updated>2021-11-01T18:58:57+09:00</updated>
  <author>
    <name>tamagram</name>
  </author>
  <generator uri="https://blog.hatena.ne.jp/" version="aa633bdb35f49e03ab60d9c27286b7dc">Hatena::Blog</generator>
  <id>hatenablog://blog/13574176438028116730</id>

  
  <entry>
<id>tag:blog.hatena.ne.jp,2013:blog-tamagram-13574176438028116730-13574176438028530517</id>
<link rel="edit" href="https://blog.hatena.ne.jp/tamagram/tamagram.hatenablog.com/atom/entry/13574176438028530517"/>
<link rel="alternate" type="text/html" href="https://tamagram.hatenablog.com/entry/2021/11/01/185857"/>
<author><name>tamagram</name></author>
<title>タイトル2</title>
<updated>2021-11-01T18:58:57+09:00</updated>
<published>2021-11-01T18:58:57+09:00</published>
<app:edited>2021-11-01T18:58:57+09:00</app:edited>
<summary type="text">見出し ok</summary>
<content type="text/x-markdown"># 見出し
- ok</content>
<hatena:formatted-content type="text/html" xmlns:hatena="http://www.hatena.ne.jp/info/xmlns#">&lt;h1&gt;見出し&lt;/h1&gt;

&lt;ul&gt;
&lt;li&gt;ok&lt;/li&gt;
&lt;/ul&gt;

</hatena:formatted-content>

<app:control>
  <app:draft>no</app:draft>
</app:control>

  </entry>
  
  <entry>
<id>tag:blog.hatena.ne.jp,2013:blog-tamagram-13574176438028116730-13574176438028119388</id>
<link rel="edit" href="https://blog.hatena.ne.jp/tamagram/tamagram.hatenablog.com/atom/entry/13574176438028119388"/>
<link rel="alternate" type="text/html" href="https://tamagram.hatenablog.com/entry/2021/10/31/161551"/>
<author><name>tamagram</name></author>
<title>タイトル</title>
<updated>2021-10-31T16:15:51+09:00</updated>
<published>2021-10-31T16:15:51+09:00</published>
<app:edited>2021-11-02T18:01:36+09:00</app:edited>
<summary type="text">見出し1 テキストテキストテキスト</summary>
<content type="text/x-markdown"># 見出し1
テキストテキストテキスト</content>
<hatena:formatted-content type="text/html" xmlns:hatena="http://www.hatena.ne.jp/info/xmlns#">&lt;h1&gt;見出し1&lt;/h1&gt;

&lt;p&gt;テキストテキストテキスト&lt;/p&gt;
</hatena:formatted-content>

<app:control>
  <app:draft>no</app:draft>
</app:control>

  </entry>
  
</feed>`;
    const jsdom = new JSDOM();
    const parser = new jsdom.window.DOMParser();
    let xmlData = parser.parseFromString(strXml, "text/xml");
    const want: POST[] = [
      {
        title: "タイトル2",
        content: `# 見出し
- ok`,
        published: new Date("2021-11-01T18:58:57+09:00"),
        updated: new Date("2021-11-01T18:58:57+09:00"),
        tags: [],
        link: "https://tamagram.hatenablog.com/entry/2021/11/01/185857",
      },
      {
        title: "タイトル",
        content: `# 見出し1
テキストテキストテキスト`,
        published: new Date("2021-10-31T16:15:51+09:00"),
        updated: new Date("2021-10-31T16:15:51+09:00"),
        tags: [],
        link: "https://tamagram.hatenablog.com/entry/2021/10/31/161551",
      },
    ];
    const got = getPosts(xmlData);
    expect(got).toEqual(want);
  });
});
