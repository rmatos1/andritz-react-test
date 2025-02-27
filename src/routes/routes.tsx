import { RouteObject } from "react-router-dom";
import { Home, ManageBook, PageNotFound } from "@/pages";
import { PagePaths } from "@/types";

export const routes: RouteObject[] = [
  {
    path: PagePaths.home,
    element: <Home />,
  },
  {
    path: PagePaths.addBook,
    element: <ManageBook />,
  },
  {
    path: PagePaths.editBook,
    element: <ManageBook />,
  },
  {
    path: PagePaths.notFound,
    element: <PageNotFound />,
  },
];
