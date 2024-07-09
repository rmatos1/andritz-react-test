import { IBook } from "@/types";
import { useBookListHelper, BookListProps } from "./bookListHelper.hook";
import { DeleteIcon, EditIcon } from "@/icons";
import { ListPagination } from "../listPagination";
import { DeleteBookModal } from "@/modals";

import globalStyles from "@/app.module.scss";
import styles from "./bookList.module.scss";

export const BookList: React.FC<BookListProps> = ({ books }) => {
  
  const {
    onEditBook,
    displayedBooks,
    currentPage,
    onClickPagination,
    selectedBook,
    isModalVisible,
    onOpenModal,
    onCloseModal,
    booksPerPage,
    onSelectBooksPerPage
  } = useBookListHelper(books);

  return (
    <>
      {
        isModalVisible && (
          <DeleteBookModal
            book={selectedBook}
            onCloseModal={onCloseModal}
          />
        )
      }
      
      <section>

        {
          <>
            {
              books.length ? (
                <>
                  {
                    displayedBooks.map((book: IBook) => (
                      <div key={book.id} className={styles.bookCard} data-testid="book-card">

                        <h3 className={styles.bookTitle}>{book.title}</h3>

                        <p className={styles.bookAuthor}>{book.author}</p>

                        <div className={globalStyles.buttonContainer}>

                          <button className={`${styles.cardButton} ${styles.editButton}`} onClick={() => onEditBook(book.id)} data-testid="edit-button"><EditIcon /> Edit</button>  
                          
                          <button className={`${styles.cardButton} ${styles.deleteButton}`} onClick={() => onOpenModal(book)} data-testid="delete-button"><DeleteIcon /> Delete</button>   

                        </div>

                      </div>
                    ))
                  }

                  <ListPagination
                    booksLength={books.length}
                    currentPage={currentPage}
                    onPagination={onClickPagination}
                    booksPerPage={booksPerPage}
                    onSelectBooksPerPage={onSelectBooksPerPage}
                  />
                </>
              ) : (
                  <p className={globalStyles.text} data-testid="no-books-result">There's no book that match with this search criteria</p>
              )
            }
          </>
        }

      </section>
    </>
  )
};