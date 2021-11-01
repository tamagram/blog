import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import Layout from "../components/layout";
import Header from "../components/header";
import Footer from "../components/footer";

const Blog: NextPage = () => (
  <Layout>
    <Header path="/blog" />
    <main>
      <h1>Blog</h1>
      <ul>
        <li>
          <article>
            title
            <Image
              src="/120x120.png"
              alt="placehold"
              width={120}
              height={120}
            />
          </article>
        </li>
      </ul>
    </main>
    <Footer />
  </Layout>
);

export default Blog;
