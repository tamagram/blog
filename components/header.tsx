import Link from "next/link";
import styles from "./header.module.css";

type ROUTE = {
  path: string;
};

const AboutPath = "/";
const BlogPath = "/blog";
const PortfolioPath = "/portfolio";

const Header: React.FC<ROUTE> = (props) => (
  <header className={styles.header}>
    <nav className={styles.header__nav}>
      <li className={styles.header__nav__li}>
        <Link href="/">
          <a
            className={
              props.path === AboutPath
                ? styles.header__nav__li__selected_a
                : styles.header__nav__li__a
            }
          >
            About
          </a>
        </Link>
      </li>
      <li className={styles.header__nav__li}>
        <Link href="/blog">
          <a
            className={
              props.path === BlogPath
                ? styles.header__nav__li__selected_a
                : styles.header__nav__li__a
            }
          >
            Blog
          </a>
        </Link>
      </li>
      <li className={styles.header__nav__li}>
        <Link href="/portfolio">
          <a
            className={
              props.path === PortfolioPath
                ? styles.header__nav__li__selected_a
                : styles.header__nav__li__a
            }
          >
            Portfolio
          </a>
        </Link>
      </li>
    </nav>
  </header>
);

export default Header;
