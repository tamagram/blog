import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "./index.module.css";
import Layout from "../components/layout";

const Home: NextPage = () => (
  <Layout>
    <header>
      <nav>
        <li>
          <Link href="/">
            <a>About</a>
          </Link>
        </li>
        <li>
          <Link href="/blog">
            <a>Blog</a>
          </Link>
        </li>
        <li>
          <Link href="/portfolio">
            <a>Portfolio</a>
          </Link>
        </li>
      </nav>
    </header>
    <main>
      <section>
        <Image src="/tamagram.jpg" alt="tamagram" width={300} height={300} />
        <Image src="/github-icon.svg" alt="github" width={90} height={90} />
        <Image src="/twitter-icon.svg" alt="github" width={90} height={90} />
        <Image src="/rss-icon.svg" alt="github" width={90} height={90} />
      </section>
      <section>
        <h2># Profile</h2>
        <p>
          Name: Masahiro Tajima <br />
          Occupation: Student <br />
          Circle: <br />
          - IPFactory <br />
          - MakeIT <br />
        </p>
        <h2># Interest</h2>
        <p>
          WebDev: React <br />
          Cloud: AWS <br />
        </p>
      </section>
    </main>
    <footer>&copy; tamagram 2021</footer>
  </Layout>
);

export default Home;
