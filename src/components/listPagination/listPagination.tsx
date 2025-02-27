import { START_PAGE } from "@/constants";
import { ChevronIcon } from "@/icons";

import globalStyles from "@/app.module.scss";
import styles from "./listPagination.module.scss";
import { ChangeEvent } from "react";
import { BOOKS_PER_PAGE_OPTIONS } from "@/constants";

export interface ListPaginationProps {
  booksLength: number;
  currentPage: number;
  onPagination: (page: number) => void;
  booksPerPage: string;
  onSelectBooksPerPage: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export const ListPagination: React.FC<ListPaginationProps> = ({
  booksLength,
  currentPage,
  onPagination,
  booksPerPage,
  onSelectBooksPerPage,
}) => {
  const totalPages = Math.ceil(booksLength / Number(booksPerPage));

  const ACTIVE_FILL = "#fff";
  const DISABLED_FILL = "#868686";

  const advanceToNextPageOnClick = () => {
    onPagination(currentPage + 1);
  };

  const returnToPreviousPageOnClick = () => {
    onPagination(currentPage - 1);
  };

  return (
    <div className={styles.paginationContainer}>
      <div className={styles.booksPerPageContainer}>
        <select
          data-testid="select-books-per-page"
          className={`${globalStyles.formInput} ${styles.selectBooksPerPage}`}
          onChange={onSelectBooksPerPage}
        >
          {BOOKS_PER_PAGE_OPTIONS.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <p className={globalStyles.text}>Books per page</p>
      </div>

      <div className={styles.pagination}>
        <button
          data-testid="prev-button"
          onClick={returnToPreviousPageOnClick}
          disabled={currentPage === START_PAGE}
        >
          <ChevronIcon
            fill={currentPage !== START_PAGE ? ACTIVE_FILL : DISABLED_FILL}
            isInverted
          />
        </button>

        <span className={styles.pageIndicator} data-testid="page-indicator">
          {currentPage} / {totalPages}
        </span>

        <button
          data-testid="next-button"
          onClick={advanceToNextPageOnClick}
          disabled={currentPage === totalPages}
        >
          <ChevronIcon
            fill={currentPage !== totalPages ? ACTIVE_FILL : DISABLED_FILL}
          />
        </button>
      </div>
    </div>
  );
};
