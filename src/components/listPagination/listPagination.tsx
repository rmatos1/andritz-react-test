import { START_PAGE } from "@/constants";
import { ChevronIcon } from "@/icons";

import globalStyles from "@/app.module.scss";
import styles from "./listPagination.module.scss";
import { ChangeEvent } from "react";

export interface ListPaginationProps {
    booksLength: number;
    currentPage: number;
    onPagination: (page: number) => void;
    booksPerPage: string;
    onSelectBooksPerPage: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export const ListPagination: React.FC<ListPaginationProps> = ({ booksLength, currentPage, onPagination, booksPerPage, onSelectBooksPerPage }) => {

    const totalPages = Math.ceil(booksLength / Number(booksPerPage));

    const ACTIVE_FILL = "#fff";
    const DISABLED_FILL = "#868686";

    return (
        <div className={styles.paginationContainer}>

            <div className={styles.booksPerPageContainer}>

                <select
                    data-testid="select-books-per-page"
                    className={`${globalStyles.formInput} ${styles.selectBooksPerPage}`}
                    onChange={onSelectBooksPerPage}
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                </select>

                <p className={globalStyles.text}>Books per page</p>

            </div>

            <div className={styles.pagination}>
                <button
                    data-testid="prev-button"
                    onClick={() => onPagination(currentPage - 1)}
                    disabled={currentPage === START_PAGE}
                >
                    <ChevronIcon fill={currentPage !== START_PAGE ? ACTIVE_FILL : DISABLED_FILL} isInverted />
                </button>

                <span className={styles.pageIndicator} data-testid="page-indicator">{currentPage} / {totalPages}</span>

                <button
                    data-testid="next-button"
                    onClick={() => onPagination(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    <ChevronIcon fill={currentPage !== totalPages ? ACTIVE_FILL : DISABLED_FILL} />
                </button>
            </div>

        </div>
    )
}