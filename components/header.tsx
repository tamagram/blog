import Link from "next/link";
import Image from "next/image";
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
      {/* <li className={styles.header__nav__li}>
        <Link href="/portfolio">
          <a
            className={
              props.path === PortfolioPath
                ? styles.header__nav__li__selected_a
                : styles.header__nav__li__a
            }
          >
            Product
          </a>
        </Link>
      </li> */}
    </nav>
    <div className={styles.header__div_menu}>
      <a href="#light_box">
        <Image src="/menu.svg" alt="menu" width={40} height={40} />
      </a>
    </div>
    <div className={styles.header__div_light_box} id="light_box">
      <div className={styles.header__div_light_box__div_menu_close}>
        <a href="#">
          <Image src="/menu-close.svg" alt="menu" width={40} height={40} />
        </a>
      </div>
      <nav className={styles.header__div_light_box__nav}>
        <li className={styles.header__div_light_box__nav__li}>
          <Link href="/">
            <a
              className={
                props.path === AboutPath
                  ? styles.header__div_light_box__nav__li__selected_a
                  : styles.header__div_light_box__nav__li__a
              }
            >
              About
            </a>
          </Link>
        </li>
        <li className={styles.header__div_light_box__nav__li}>
          <Link href="/blog">
            <a
              className={
                props.path === BlogPath
                  ? styles.header__div_light_box__nav__li__selected_a
                  : styles.header__div_light_box__nav__li__a
              }
            >
              Blog
            </a>
          </Link>
        </li>
        {/* <li className={styles.header__div_light_box__nav__li}>
          <Link href="/portfolio">
            <a
              className={
                props.path === PortfolioPath
                  ? styles.header__div_light_box__nav__li__selected_a
                  : styles.header__div_light_box__nav__li__a
              }
            >
              Portfolio
            </a>
          </Link>
        </li> */}
      </nav>
    </div>
  </header>
);

export default Header;
