import { NavBar } from "@/components";
import { svg } from "@/assets";
import { Link } from "react-router-dom";
import { PagePaths } from "@/types";

import globalStyles from "@/app.module.scss";

export const PageNotFound = () => {
  return (
    <>
      <NavBar />

      <main className={globalStyles.centeredContainer}>
        <h1 className={globalStyles.title}>Page not found!</h1>

        <img src={svg.pageNotFound} alt="" className={globalStyles.img} />

        <p className={globalStyles.text}>
          Oops... It looks like you are lost! But we can help you with some
          links:
        </p>

        <div className={globalStyles.buttonContainer}>
          <Link to={PagePaths.home}>Book List</Link>
          <Link to={PagePaths.addBook}>Add Book</Link>
        </div>
      </main>
    </>
  );
};
