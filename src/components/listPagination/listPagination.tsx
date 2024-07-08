import { BOOKS_PER_PAGE, START_PAGE } from "@/constants";
import { ChevronIcon } from "@/icons";

import styles from "./listPagination.module.scss";

export interface ListPaginationProps {
    booksLength: number;
    currentPage: number;
    onPagination: (page: number) => void;
}

export const ListPagination: React.FC<ListPaginationProps> = ({ booksLength, currentPage, onPagination }) => {

    const totalPages = Math.ceil(booksLength / BOOKS_PER_PAGE);

    const ACTIVE_FILL = "#fff";
    const DISABLED_FILL = "#868686";

    return (
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
    )
}