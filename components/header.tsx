import Link from "next/link";
import Image from "next/image";
import styles from "./header.module.scss";

type ROUTE = {
  path: string;
};

const TimelinePath = "/";
const AboutPath = "/about";
const BlogPath = "/blog";
const PortfolioPath = "/portfolio";

const Header: React.FC<ROUTE> = (props) => (
  <header className={styles.header}>
    <nav className={styles.header__nav}>
      <li className={styles.header__nav__li}>
        <Link href={TimelinePath}>
          <a
            className={
              props.path === TimelinePath
                ? styles.header__nav__li__selected_a
                : styles.header__nav__li__a
            }
          >
            Timeline
          </a>
        </Link>
      </li>
      <li className={styles.header__nav__li}>
        <Link href={AboutPath}>
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
    </nav>

    {
      // responsive
    }
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
          <Link href={TimelinePath}>
            <a
              className={
                props.path === TimelinePath
                  ? styles.header__div_light_box__nav__li__selected_a
                  : styles.header__div_light_box__nav__li__a
              }
            >
              Timeline
            </a>
          </Link>
        </li>
        <li className={styles.header__div_light_box__nav__li}>
          <Link href={AboutPath}>
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
      </nav>
    </div>
  </header>
);

export default Header;
