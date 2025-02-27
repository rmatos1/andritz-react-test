import { Link, useLocation } from "react-router-dom";
import { PagePaths } from "@/types";

import styles from "./navBar.module.scss";

interface INavLink {
  path: PagePaths;
  link: string;
}

export const NavBar = () => {
  const location = useLocation();

  const navLinks: INavLink[] = [
    {
      path: PagePaths.home,
      link: "Book List",
    },
    {
      path: PagePaths.addBook,
      link: "Add Book",
    },
  ];

  return (
    <nav className={styles.navBar}>
      {navLinks.map((item) => (
        <Link
          key={item.link}
          className={location.pathname === item.path ? styles.active : ""}
          to={item.path}
        >
          {item.link}
        </Link>
      ))}
    </nav>
  );
};
