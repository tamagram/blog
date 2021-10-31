import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import Layout from "../components/layout";
import Header from "../components/header";

const Portfolio: NextPage = () => (
  <Layout>
    <Header path="/portfolio" />
    <main>
      <h1>Projects</h1>
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
    <footer>&copy; tamagram 2021</footer>
  </Layout>
);

export default Portfolio;
